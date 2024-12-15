import { PageHeader } from "@/components/PageHeader";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, DollarSign, FileText, Award, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function EmployeeDashboard() {
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
          description="View your work summary and quick actions"
        />
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Leave Balance" value="15 days" icon={<Calendar className="h-4 w-4" />} />
        <DashboardCard title="Pending Tasks" value="5" icon={<FileText className="h-4 w-4" />} />
        <DashboardCard title="Next Review" value="In 2 weeks" icon={<Award className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start w-full" onClick={() => navigate('/leave-request')}>
              <Calendar className="mr-2 h-4 w-4" />
              Request Leave
            </Button>
            <Button variant="outline" className="justify-start w-full" onClick={() => navigate('/expense-submission')}>
              <DollarSign className="mr-2 h-4 w-4" />
              Submit Expense
            </Button>
            <Button variant="outline" className="justify-start w-full" onClick={() => navigate('/documents')}>
              <FileText className="mr-2 h-4 w-4" />
              View Documents
            </Button>
            <Button variant="outline" className="justify-start w-full" onClick={() => navigate('/performance-goals')}>
              <Award className="mr-2 h-4 w-4" />
              Performance Goals
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Announcements</h2>
          <div className="space-y-2 bg-accent rounded-lg p-4">
            <p className="text-sm text-muted-foreground flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Company meeting scheduled for next week
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              New health insurance policy updates
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Upcoming team building event
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}