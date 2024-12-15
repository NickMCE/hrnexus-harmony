import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Download, Filter, PenSquare, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PayrollRecord {
  id: string;
  name: string;
  employeeId: string;
  salary: number;
  department: string;
  status: "Processed" | "Pending";
  lastModified: string;
}

const initialPayroll: PayrollRecord[] = [
  {
    id: "1",
    name: "John Doe",
    employeeId: "EMP001",
    salary: 5000,
    department: "IT",
    status: "Processed",
    lastModified: new Date().toLocaleDateString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    employeeId: "EMP002",
    salary: 4500,
    department: "Marketing",
    status: "Pending",
    lastModified: new Date().toLocaleDateString(),
  },
  {
    id: "3",
    name: "Mike Johnson",
    employeeId: "EMP003",
    salary: 6000,
    department: "Finance",
    status: "Processed",
    lastModified: new Date().toLocaleDateString(),
  },
];

export default function PayrollManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [payroll, setPayroll] = useState<PayrollRecord[]>(initialPayroll);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedSalary, setEditedSalary] = useState<string>("");

  const handleEdit = (record: PayrollRecord) => {
    setEditingId(record.id);
    setEditedSalary(record.salary.toString());
  };

  const handleSave = (id: string) => {
    setPayroll(
      payroll.map((record) =>
        record.id === id
          ? {
              ...record,
              salary: Number(editedSalary),
              lastModified: new Date().toLocaleDateString(),
            }
          : record
      )
    );
    setEditingId(null);
    toast({
      title: "Success",
      description: "Payroll updated successfully",
    });
  };

  const processPayroll = () => {
    setPayroll(
      payroll.map((record) => ({
        ...record,
        status: "Processed",
        lastModified: new Date().toLocaleDateString(),
      }))
    );
    toast({
      title: "Success",
      description: "All payroll records have been processed",
    });
  };

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
        <Button onClick={processPayroll}>
          <DollarSign className="mr-2 h-4 w-4" />
          Process Payroll
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {payroll.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 bg-accent rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium">{record.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {record.employeeId} • {record.department}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Last modified: {record.lastModified}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    {editingId === record.id ? (
                      <div className="flex items-center gap-2">
                        <Label htmlFor="salary" className="sr-only">
                          Salary
                        </Label>
                        <Input
                          id="salary"
                          type="number"
                          value={editedSalary}
                          onChange={(e) => setEditedSalary(e.target.value)}
                          className="w-32"
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => handleSave(record.id)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <p className="font-medium">${record.salary}</p>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            record.status === "Processed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </>
                    )}
                  </div>
                  {editingId !== record.id && (
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => handleEdit(record)}
                      >
                        <PenSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}