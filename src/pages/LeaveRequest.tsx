import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar as CalendarIcon, Check, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface LeaveRequest {
  id: string;
  employeeName: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

// Mock data - In a real app, this would come from a backend
const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeName: "John Doe",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-20"),
    reason: "Family vacation",
    status: "Pending",
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    startDate: new Date("2024-03-25"),
    endDate: new Date("2024-03-26"),
    reason: "Medical appointment",
    status: "Approved",
  },
];

export default function LeaveRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);

  const form = useForm({
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (data: { reason: string }) => {
    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }

    const newRequest: LeaveRequest = {
      id: (leaveRequests.length + 1).toString(),
      employeeName: user?.username || "Unknown",
      startDate,
      endDate,
      reason: data.reason,
      status: "Pending",
    };

    setLeaveRequests([...leaveRequests, newRequest]);
    toast({
      title: "Success",
      description: "Leave request submitted successfully",
    });
    form.reset();
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const handleStatusUpdate = (id: string, newStatus: "Approved" | "Rejected") => {
    setLeaveRequests(
      leaveRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
    toast({
      title: "Success",
      description: `Leave request ${newStatus.toLowerCase()} successfully`,
    });
  };

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Leave Request"
          description={
            user?.role === "HR"
              ? "Manage employee leave requests"
              : "Submit and track your leave requests"
          }
        />
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {user?.role === "Employee" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Submit New Request</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormLabel>Start Date</FormLabel>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="space-y-2">
                    <FormLabel>End Date</FormLabel>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter reason for leave" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {user?.role === "HR" ? "All Leave Requests" : "Your Leave History"}
          </h3>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div
                key={request.id}
                className="flex justify-between items-center p-4 bg-accent rounded-lg"
              >
                <div>
                  <p className="font-medium">{request.employeeName}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.startDate.toLocaleDateString()} -{" "}
                    {request.endDate.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{request.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status}
                  </span>
                  {user?.role === "HR" && request.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => handleStatusUpdate(request.id, "Approved")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => handleStatusUpdate(request.id, "Rejected")}
                      >
                        <X className="h-4 w-4" />
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