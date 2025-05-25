import { NextApiRequest, NextApiResponse } from 'next';
import { parse, format, addHours, isBefore, isAfter, setHours, setMinutes } from 'date-fns';

// Types for time slots
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

// Generate time slots for a specific date between business hours
const generateTimeSlots = (date: string, category: string): TimeSlot[] => {
  const businessStart = 9; // 9 AM
  const businessEnd = 18; // 6 PM
  const slotDurationHours = 1; // 1 hour slots
  
  const slots: TimeSlot[] = [];
  const baseDate = parse(date, 'yyyy-MM-dd', new Date());
  
  // Generate slots from business start to end
  let currentSlot = setHours(setMinutes(baseDate, 0), businessStart);
  const endTime = setHours(setMinutes(baseDate, 0), businessEnd);
  
  let id = 1;
  
  while (isBefore(currentSlot, endTime)) {
    // Skip lunch hour
    if (currentSlot.getHours() !== 12) {
      // Randomize availability but make it somewhat realistic
      // More likely to be available in morning than afternoon
      const random = Math.random();
      const isMorning = currentSlot.getHours() < 12;
      const isWeekend = currentSlot.getDay() === 0 || currentSlot.getDay() === 6;
      
      // More availability for high-demand categories
      const highDemand = category === '1' || category === '2'; // Facial & Massage
      
      // Complex availability logic to make it realistic
      const isAvailable = 
        (isMorning && random > 0.3) || // Higher availability in morning
        (!isMorning && random > 0.6) || // Lower in afternoon
        (isWeekend && random > 0.7) || // Even lower on weekends
        (highDemand && random > 0.4); // More slots for popular treatments
      
      slots.push({
        id: `slot-${id}`,
        time: format(currentSlot, 'h:mm a'),
        available: isAvailable
      });
      
      id++;
    }
    
    currentSlot = addHours(currentSlot, slotDurationHours);
  }
  
  return slots;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add a small delay to simulate network request and real-time availability
  setTimeout(() => {
    const { category, date } = req.query;
    
    if (!category || !date) {
      return res.status(400).json({ error: 'Category and date are required parameters' });
    }
    
    // For demo purposes, generate slots for the given date
    const formattedDate = String(date);
    const slots = generateTimeSlots(formattedDate, String(category));
    
    // Return the availability slots
    res.status(200).json({
      date: formattedDate,
      category: category,
      slots: slots,
      updated: new Date().toISOString()
    });
  }, 300);
} 