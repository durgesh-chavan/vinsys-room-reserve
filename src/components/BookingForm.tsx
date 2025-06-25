
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, Users, FileText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useBookingContext } from "@/contexts/BookingContext";

const BookingForm = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [formData, setFormData] = useState({
    room: "",
    startTime: "",
    endTime: "",
    purpose: "",
    participants: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addBooking } = useBookingContext();

  const rooms = [
    "Training Room A",
    "Training Room B", 
    "Conference Hall",
    "Workshop Room",
    "Seminar Hall",
    "Meeting Room 1",
    "Meeting Room 2"
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !formData.room || !formData.startTime || !formData.endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const bookingData = {
        room: formData.room,
        date: format(selectedDate, "yyyy-MM-dd"),
        startTime: formData.startTime,
        endTime: formData.endTime,
        user: user.name,
        email: user.email,
        purpose: formData.purpose,
        participants: parseInt(formData.participants) || 1
      };

      addBooking(bookingData);

      toast({
        title: "Booking Submitted Successfully!",
        description: "Your booking request has been sent to admin for approval.",
      });

      // Reset form
      setFormData({
        room: "",
        startTime: "",
        endTime: "",
        purpose: "",
        participants: ""
      });
      setSelectedDate(undefined);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Book a Training Room</h2>
        <p className="text-gray-600 mt-1">Reserve a room for your training session or meeting</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            <span>Booking Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Room Selection */}
            <div className="space-y-2">
              <Label htmlFor="room" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Training Room *</span>
              </Label>
              <Select value={formData.room} onValueChange={(value) => handleInputChange("room", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map(room => (
                    <SelectItem key={room} value={room}>{room}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Date *</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Start Time *</span>
                </Label>
                <Select value={formData.startTime} onValueChange={(value) => handleInputChange("startTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>End Time *</span>
                </Label>
                <Select value={formData.endTime} onValueChange={(value) => handleInputChange("endTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-2">
              <Label htmlFor="participants" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Number of Participants</span>
              </Label>
              <Input
                id="participants"
                type="number"
                placeholder="Enter number of participants"
                value={formData.participants}
                onChange={(e) => handleInputChange("participants", e.target.value)}
                min="1"
                max="100"
              />
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <Label htmlFor="purpose" className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Purpose of Booking</span>
              </Label>
              <Textarea
                id="purpose"
                placeholder="Describe the purpose of your booking (e.g., Team training, Client meeting, Workshop)"
                value={formData.purpose}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Booking Request
                </>
              )}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Your booking request will be sent to admin for approval
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
