import { PageHeader } from "@/components/PageHeader";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function EmployeeDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10 space-y-8 fade-in">
      <PageHeader
        title={`Welcome, ${user?.username}`}
        description="View your work summary and quick actions"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Leave Balance" value="15 days" />
        <DashboardCard title="Pending Tasks" value="5" />
        <DashboardCard title="Upcoming Reviews" value="1" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start">
              Request Leave
            </Button>
            <Button variant="outline" className="justify-start">
              Submit Timesheet
            </Button>
            <Button variant="outline" className="justify-start">
              View Pay Slip
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Announcements</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • Company meeting scheduled for next week
            </p>
            <p className="text-sm text-muted-foreground">
              • New health insurance policy updates
            </p>
            <p className="text-sm text-muted-foreground">
              • Upcoming team building event
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}