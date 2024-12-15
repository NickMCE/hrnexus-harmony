import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PerformanceGoals() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Performance Goals"
          description="Track and manage your performance objectives"
        />
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="grid gap-6">
        {[
          {
            title: "Complete Project Management Certification",
            progress: 75,
            deadline: "June 2024",
            status: "On Track",
          },
          {
            title: "Improve Team Communication",
            progress: 60,
            deadline: "May 2024",
            status: "In Progress",
          },
          {
            title: "Learn New Technology Stack",
            progress: 30,
            deadline: "August 2024",
            status: "Behind",
          },
        ].map((goal, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">{goal.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Due: {goal.deadline}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between items-center">
                  <span
                    className={`text-sm px-2 py-1 rounded-full ${
                      goal.status === "On Track"
                        ? "bg-green-100 text-green-800"
                        : goal.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {goal.status}
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