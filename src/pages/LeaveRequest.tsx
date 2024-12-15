import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeaveRequest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Leave Request"
          description="Submit and manage your leave requests"
        />
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Submit New Request</h3>
            <div className="space-y-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <Button className="w-full mt-4">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Leave History</h3>
            <div className="space-y-4">
              {[
                { date: "2024-03-15", status: "Approved", type: "Vacation" },
                { date: "2024-02-28", status: "Pending", type: "Sick Leave" },
              ].map((leave, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-accent rounded-lg"
                >
                  <div>
                    <p className="font-medium">{leave.type}</p>
                    <p className="text-sm text-muted-foreground">{leave.date}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}