
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";

const BookingCalendar = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample booking data
  useEffect(() => {
    const sampleBookings = [
      {
        id: "BK001",
        room: "Training Room A",
        date: "2024-12-28",
        startTime: "09:00",
        endTime: "11:00",
        user: "John Doe",
        purpose: "Team Training Session",
        status: "approved",
        participants: 15
      },
      {
        id: "BK002",
        room: "Conference Hall",
        date: "2024-12-29",
        startTime: "14:00",
        endTime: "16:00",
        user: "Jane Smith",
        purpose: "Client Presentation",
        status: "pending",
        participants: 25
      },
      {
        id: "BK003",
        room: "Training Room B",
        date: "2024-12-30",
        startTime: "10:00",
        endTime: "12:00",
        user: "Mike Johnson",
        purpose: "Workshop",
        status: "approved",
        participants: 12
      }
    ];
    setBookings(sampleBookings);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getBookingsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span>Booking Calendar</span>
        </h2>
        <p className="text-gray-600 mt-1">View all training room bookings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth(1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Weekday Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const dayBookings = day ? getBookingsForDate(day) : [];
                  const isToday = day && day.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate && day && day.toDateString() === selectedDate.toDateString();

                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[80px] p-2 border rounded-lg cursor-pointer transition-colors
                        ${day ? 'hover:bg-gray-50' : 'bg-gray-100'}
                        ${isToday ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}
                        ${isSelected ? 'bg-blue-100 border-blue-300' : ''}
                      `}
                      onClick={() => day && setSelectedDate(day)}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                            {day.getDate()}
                          </div>
                          <div className="space-y-1 mt-1">
                            {dayBookings.slice(0, 2).map(booking => (
                              <div
                                key={booking.id}
                                className={`text-xs px-1 py-0.5 rounded ${getStatusColor(booking.status)}`}
                              >
                                {booking.startTime} - {booking.room.split(' ')[2]}
                              </div>
                            ))}
                            {dayBookings.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{dayBookings.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Details */}
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>
                  {selectedDate ? 
                    `${selectedDate.toLocaleDateString()}` : 
                    "Select a Date"
                  }
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="space-y-4">
                  {getBookingsForDate(selectedDate).map(booking => (
                    <div key={booking.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-500">{booking.id}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{booking.room}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{booking.participants} participants</span>
                        </div>
                        
                        <div className="text-sm">
                          <span className="font-medium">Booked by:</span> {booking.user}
                        </div>
                        
                        {booking.purpose && (
                          <div className="text-sm">
                            <span className="font-medium">Purpose:</span> {booking.purpose}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {getBookingsForDate(selectedDate).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No bookings for this date</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Click on a date to view bookings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
