
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Users, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookingForm = ({ user }) => {
  const [booking, setBooking] = useState({
    room: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: "",
    purpose: "",
    equipment: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const rooms = [
    { id: "tr1", name: "Training Room A", capacity: 20, equipment: ["Projector", "Whiteboard", "AC"] },
    { id: "tr2", name: "Training Room B", capacity: 15, equipment: ["Projector", "Flipchart", "AC"] },
    { id: "tr3", name: "Conference Hall", capacity: 50, equipment: ["AV System", "Microphone", "AC"] },
    { id: "tr4", name: "Workshop Room", capacity: 25, equipment: ["Tools", "Workstations", "AC"] }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", 
    "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
    "16:00", "16:30", "17:00", "17:30", "18:00"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!booking.room || !booking.date || !booking.startTime || !booking.endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const bookingId = `BK${Date.now()}`;
      
      toast({
        title: "Booking Submitted Successfully!",
        description: `Your booking request (${bookingId}) has been sent for admin approval.`,
      });

      // Reset form
      setBooking({
        room: "",
        date: "",
        startTime: "",
        endTime: "",
        participants: "",
        purpose: "",
        equipment: []
      });

      setIsSubmitting(false);
    }, 1000);
  };

  const selectedRoom = rooms.find(room => room.id === booking.room);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          <span>Book Training Room</span>
        </h2>
        <p className="text-gray-600 mt-1">Schedule your training session or meeting</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>Room Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Room Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room">Training Room *</Label>
                <Select value={booking.room} onValueChange={(value) => setBooking(prev => ({ ...prev, room: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name} (Capacity: {room.capacity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={booking.date}
                  onChange={(e) => setBooking(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Select value={booking.startTime} onValueChange={(value) => setBooking(prev => ({ ...prev, startTime: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Select value={booking.endTime} onValueChange={(value) => setBooking(prev => ({ ...prev, endTime: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="participants">Number of Participants</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="participants"
                    type="number"
                    placeholder="e.g., 15"
                    value={booking.participants}
                    onChange={(e) => setBooking(prev => ({ ...prev, participants: e.target.value }))}
                    className="pl-10"
                    min="1"
                    max={selectedRoom?.capacity || 50}
                  />
                </div>
              </div>

              {selectedRoom && (
                <div className="space-y-2">
                  <Label>Available Equipment</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.equipment.map(item => (
                        <span key={item} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Meeting</Label>
              <Textarea
                id="purpose"
                placeholder="Brief description of your training session or meeting..."
                value={booking.purpose}
                onChange={(e) => setBooking(prev => ({ ...prev, purpose: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setBooking({
                  room: "",
                  date: "",
                  startTime: "",
                  endTime: "",
                  participants: "",
                  purpose: "",
                  equipment: []
                })}
              >
                Clear Form
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? "Submitting..." : "Submit Booking"}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
