
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CheckCircle, XCircle, Clock, Users, MapPin, Calendar, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    // Sample booking requests
    const sampleBookings = [
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
        status: "pending",
        participants: 25,
        createdAt: "2024-12-27T11:15:00Z"
      },
      {
        id: "BK003",
        room: "Training Room B",
        date: "2024-12-30",
        startTime: "10:00",
        endTime: "12:00",
        user: "Mike Johnson",
        email: "mike.johnson@vinsys.com",
        purpose: "Workshop on Cloud Technologies",
        status: "approved",
        participants: 12,
        createdAt: "2024-12-26T14:20:00Z"
      },
      {
        id: "BK004",
        room: "Workshop Room",
        date: "2024-12-31",
        startTime: "15:00",
        endTime: "17:00",
        user: "Sarah Wilson",
        email: "sarah.wilson@vinsys.com",
        purpose: "Year-end Team Building Activity",
        status: "rejected",
        participants: 30,
        createdAt: "2024-12-25T09:45:00Z"
      }
    ];

    setBookings(sampleBookings);

    // Calculate stats
    const newStats = {
      total: sampleBookings.length,
      pending: sampleBookings.filter(b => b.status === "pending").length,
      approved: sampleBookings.filter(b => b.status === "approved").length,
      rejected: sampleBookings.filter(b => b.status === "rejected").length
    };
    setStats(newStats);
  }, []);

  const handleBookingAction = (bookingId, action) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: action }
          : booking
      )
    );

    const booking = bookings.find(b => b.id === bookingId);
    toast({
      title: `Booking ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      description: `${booking?.user}'s booking for ${booking?.room} has been ${action}.`,
    });

    // Update stats
    setStats(prev => ({
      ...prev,
      pending: bookings.filter(b => b.status === "pending" && b.id !== bookingId).length + 
               (action === "pending" ? 1 : 0),
      approved: bookings.filter(b => b.status === "approved").length + 
                (action === "approved" ? 1 : 0),
      rejected: bookings.filter(b => b.status === "rejected").length + 
                (action === "rejected" ? 1 : 0)
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const processedBookings = bookings.filter(b => b.status !== "pending");

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Shield className="h-6 w-6 text-purple-600" />
          <span>Admin Dashboard</span>
        </h2>
        <p className="text-gray-600 mt-1">Manage booking requests and system overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Management */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Pending Requests ({pendingBookings.length})</span>
              </TabsTrigger>
              <TabsTrigger value="processed" className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Processed ({processedBookings.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="mt-6">
              <div className="space-y-4">
                {pendingBookings.map(booking => (
                  <Card key={booking.id} className="border-l-4 border-l-yellow-500">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-gray-500">{booking.id}</span>
                          </div>
                          
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {booking.user} - {booking.room}
                          </h3>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{booking.startTime} - {booking.endTime}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>{booking.participants} participants</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <span className="font-medium">Email:</span> {booking.email}
                              </div>
                              <div>
                                <span className="font-medium">Purpose:</span>
                                <p className="mt-1">{booking.purpose}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                            onClick={() => handleBookingAction(booking.id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => handleBookingAction(booking.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {pendingBookings.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No pending booking requests</p>
                    <p>All caught up! Check back later for new requests.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="processed" className="mt-6">
              <div className="space-y-4">
                {processedBookings.map(booking => (
                  <Card key={booking.id} className={`border-l-4 ${
                    booking.status === 'approved' ? 'border-l-green-500' : 'border-l-red-500'
                  }`}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-gray-500">{booking.id}</span>
                          </div>
                          
                          <h3 className="font-semibold text-lg text-gray-900 mb-2">
                            {booking.user} - {booking.room}
                          </h3>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{booking.startTime} - {booking.endTime}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>{booking.participants} participants</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
