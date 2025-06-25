import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Shield, ChevronRight } from "lucide-react";
import LoginForm from "@/components/LoginForm";
import BookingForm from "@/components/BookingForm";
import BookingCalendar from "@/components/BookingCalendar";
import AdminDashboard from "@/components/AdminDashboard";
import { BookingProvider } from "@/contexts/BookingContext";

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState("login");

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setActiveView(userData.role === "admin" ? "admin" : "booking");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView("login");
  };

  if (!currentUser && activeView === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">VINSYS Booking System</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamline your training room reservations with our comprehensive booking platform
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Real-time Booking</h3>
                <p className="text-gray-600 text-sm">Instant room availability and booking confirmation</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Team Management</h3>
                <p className="text-gray-600 text-sm">Coordinate training sessions with your team</p>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Admin Control</h3>
                <p className="text-gray-600 text-sm">Comprehensive approval and management system</p>
              </CardContent>
            </Card>
          </div>

          {/* Login Section */}
          <div className="max-w-md mx-auto">
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">VINSYS Booking</h1>
                  <p className="text-sm text-gray-500">Welcome, {currentUser?.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {currentUser?.role !== "admin" && (
                  <>
                    <Button
                      variant={activeView === "booking" ? "default" : "ghost"}
                      onClick={() => setActiveView("booking")}
                      className="flex items-center space-x-2"
                    >
                      <span>Book Room</span>
                    </Button>
                    <Button
                      variant={activeView === "calendar" ? "default" : "ghost"}
                      onClick={() => setActiveView("calendar")}
                      className="flex items-center space-x-2"
                    >
                      <span>View Calendar</span>
                    </Button>
                  </>
                )}
                {currentUser?.role === "admin" && (
                  <Button
                    variant={activeView === "admin" ? "default" : "ghost"}
                    onClick={() => setActiveView("admin")}
                    className="flex items-center space-x-2"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Button>
                )}
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {activeView === "booking" && <BookingForm user={currentUser} />}
          {activeView === "calendar" && <BookingCalendar user={currentUser} />}
          {activeView === "admin" && <AdminDashboard user={currentUser} />}
        </main>
      </div>
    </BookingProvider>
  );
};

export default Index;
