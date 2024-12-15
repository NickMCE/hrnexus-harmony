import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExpenseSubmission() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Expense Submission"
          description="Submit and track your expenses"
        />
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold">Submit New Expense</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="amount" type="number" className="pl-9" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter expense description" />
              </div>
              <div className="space-y-2">
                <Label>Receipt</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Drop your receipt here or click to upload
                  </p>
                </div>
              </div>
              <Button className="w-full">Submit Expense</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
            <div className="space-y-4">
              {[
                { amount: 150, description: "Office Supplies", status: "Approved" },
                { amount: 75, description: "Travel Expense", status: "Pending" },
              ].map((expense, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-accent rounded-lg"
                >
                  <div>
                    <p className="font-medium">${expense.amount}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.description}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      expense.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {expense.status}
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