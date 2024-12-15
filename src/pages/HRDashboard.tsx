import { PageHeader } from "@/components/PageHeader";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Users, FileText, Calendar, DollarSign, Award, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function HRDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  return (
    <div className="container mx-auto py-10 space-y-8 fade-in">
      <div className="flex justify-between items-center">
        <PageHeader
          title={`Welcome, ${user?.username}`}
          description="Manage your organization from one place"
        />
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Employees" value="150" icon={<Users className="h-4 w-4" />} />
        <DashboardCard title="Pending Leave Requests" value="12" icon={<Calendar className="h-4 w-4" />} />
        <DashboardCard title="Active Projects" value="8" icon={<FileText className="h-4 w-4" />} />
        <DashboardCard title="Monthly Payroll" value="$125,000" icon={<DollarSign className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add New Employee
            </Button>
            <Button variant="outline" className="justify-start w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Review Leave Requests
            </Button>
            <Button variant="outline" className="justify-start w-full">
              <DollarSign className="mr-2 h-4 w-4" />
              Manage Payroll
            </Button>
            <Button variant="outline" className="justify-start w-full">
              <Award className="mr-2 h-4 w-4" />
              Performance Reviews
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <div className="space-y-2 bg-accent rounded-lg p-4">
            <p className="text-sm text-muted-foreground flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              New leave request from John Doe
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Performance review due for Marketing team
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              3 new employee documents pending review
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}