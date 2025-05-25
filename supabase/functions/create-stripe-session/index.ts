import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import Stripe from 'https://esm.sh/stripe@12.17.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get booking data from request
    const { bookingId } = await req.json();
    
    if (!bookingId) {
      return new Response(
        JSON.stringify({ error: 'Booking ID is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY') ?? '';
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });
    
    // Get booking details with user and service info
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        user:user_id (*),
        service:service_id (*)
      `)
      .eq('id', bookingId)
      .single();
    
    if (bookingError || !booking) {
      return new Response(
        JSON.stringify({ error: 'Booking not found', details: bookingError }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: booking.service.name,
              description: `Appointment on ${new Date(booking.date).toLocaleDateString()} at ${booking.time}`,
            },
            unit_amount: Math.round(parseFloat(booking.service.price) * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${Deno.env.get('FRONTEND_URL') ?? ''}/profile?payment=success`,
      cancel_url: `${Deno.env.get('FRONTEND_URL') ?? ''}/profile?payment=canceled`,
      customer_email: booking.user.email,
      client_reference_id: bookingId,
      metadata: {
        booking_id: bookingId,
        user_id: booking.user_id,
        service_id: booking.service_id,
      },
    });

    // Store the session ID in the booking record
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ 
        payment_session_id: session.id,
        payment_status: 'PENDING'
      })
      .eq('id', bookingId);

    if (updateError) {
      console.error('Error updating booking with payment session:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        sessionId: {
          id: session.id,
          url: session.url
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
    
  } catch (error) {
    console.error('Error in create-stripe-session function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}); 