import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PerformanceReviews() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Performance Reviews"
          description="Manage employee performance evaluations"
        />
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="grid gap-6">
        {[
          {
            name: "John Doe",
            position: "Senior Developer",
            department: "IT",
            rating: 4.5,
            status: "Completed",
            completionRate: 100,
          },
          {
            name: "Jane Smith",
            position: "Marketing Manager",
            department: "Marketing",
            rating: 4.0,
            status: "In Progress",
            completionRate: 60,
          },
          {
            name: "Mike Johnson",
            position: "Financial Analyst",
            department: "Finance",
            rating: 3.8,
            status: "Pending",
            completionRate: 0,
          },
        ].map((review, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {review.position} • {review.department}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{review.rating}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{review.completionRate}%</span>
                  </div>
                  <Progress value={review.completionRate} className="h-2" />
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      review.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : review.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {review.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}