import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PayrollManagement() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Payroll Management"
          description="Manage employee payroll and compensation"
        />
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button>
          <DollarSign className="mr-2 h-4 w-4" />
          Process Payroll
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[
              {
                name: "John Doe",
                id: "EMP001",
                salary: "$5,000",
                department: "IT",
                status: "Processed",
              },
              {
                name: "Jane Smith",
                id: "EMP002",
                salary: "$4,500",
                department: "Marketing",
                status: "Pending",
              },
              {
                name: "Mike Johnson",
                id: "EMP003",
                salary: "$6,000",
                department: "Finance",
                status: "Processed",
              },
            ].map((employee, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-accent rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {employee.id} • {employee.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">{employee.salary}</p>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        employee.status === "Processed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}