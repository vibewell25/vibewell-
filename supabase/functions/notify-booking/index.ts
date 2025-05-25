import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

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
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get booking details with user and service info
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select(`
        *,
        user:user_id (*),
        service:service_id (*, provider:provider_id (*))
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

    // In a real implementation, we would send emails and SMS
    // For this demo, we'll just log the notification details
    const emailContent = {
      to: booking.user.email,
      subject: 'Your VibeWell Booking Confirmation',
      html: `
        <h1>Booking Confirmed!</h1>
        <p>Dear ${booking.user.name},</p>
        <p>Your booking for <strong>${booking.service.name}</strong> on ${new Date(booking.date).toLocaleDateString()} at ${booking.time} has been confirmed.</p>
        <p>Location: ${booking.service.provider.location}</p>
        <p>Thank you for choosing VibeWell!</p>
      `,
    };

    const smsContent = {
      to: booking.user.phone,
      body: `Your VibeWell booking for ${booking.service.name} on ${new Date(booking.date).toLocaleDateString()} at ${booking.time} is confirmed. Thank you!`,
    };

    console.log('Email notification:', emailContent);
    console.log('SMS notification:', smsContent);

    // In production, we would use SendGrid and Twilio:
    // await sendGridClient.send(emailContent);
    // await twilioClient.messages.create(smsContent);

    // Update booking status to confirmed
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'CONFIRMED' })
      .eq('id', bookingId);

    if (updateError) {
      console.error('Error updating booking status:', updateError);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notifications sent' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
    
  } catch (error) {
    console.error('Error in notify-booking function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}); 