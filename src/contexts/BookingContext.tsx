
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Booking {
  id: string;
  room: string;
  date: string;
  startTime: string;
  endTime: string;
  user: string;
  email: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  participants: number;
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
  updateBookingStatus: (bookingId: string, status: 'approved' | 'rejected') => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([
    // Initial sample data
    {
      id: "BK001",
      room: "Training Room A",
      date: "2024-12-28",
      startTime: "09:00",
      endTime: "11:00",
      user: "John Doe",
      email: "john.doe@vinsys.com",
      purpose: "Team Training Session on React Development",
      status: "pending",
      participants: 15,
      createdAt: "2024-12-27T10:30:00Z"
    },
    {
      id: "BK002",
      room: "Conference Hall",
      date: "2024-12-29",
      startTime: "14:00",
      endTime: "16:00",
      user: "Jane Smith",
      email: "jane.smith@vinsys.com",
      purpose: "Client Presentation for Q4 Results",
      status: "approved",
      participants: 25,
      createdAt: "2024-12-27T11:15:00Z"
    }
  ]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK${String(bookings.length + 1).padStart(3, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setBookings(prev => [newBooking, ...prev]);
    console.log('New booking added:', newBooking);
  };

  const updateBookingStatus = (bookingId: string, status: 'approved' | 'rejected') => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status }
          : booking
      )
    );
    console.log(`Booking ${bookingId} status updated to: ${status}`);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, updateBookingStatus }}>
      {children}
    </BookingContext.Provider>
  );
};
