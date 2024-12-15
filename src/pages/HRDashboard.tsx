import { PageHeader } from "@/components/PageHeader";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function HRDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10 space-y-8 fade-in">
      <PageHeader
        title={`Welcome, ${user?.username}`}
        description="Manage your organization from one place"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Employees" value="150" />
        <DashboardCard title="Pending Leave Requests" value="12" />
        <DashboardCard title="Active Projects" value="8" />
        <DashboardCard title="Departments" value="6" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid gap-2">
            <Button variant="outline" className="justify-start">
              Add New Employee
            </Button>
            <Button variant="outline" className="justify-start">
              Review Leave Requests
            </Button>
            <Button variant="outline" className="justify-start">
              Manage Payroll
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              • New leave request from John Doe
            </p>
            <p className="text-sm text-muted-foreground">
              • Performance review due for Marketing team
            </p>
            <p className="text-sm text-muted-foreground">
              • 3 new employee documents pending review
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}