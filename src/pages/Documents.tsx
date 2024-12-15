import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Documents() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Documents"
          description="Access and manage your documents"
        />
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {user?.role === "HR" && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upload New Document</h3>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drag and drop your files here, or click to select files
              </p>
              <Button className="mt-4">Select Files</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {[
          { name: "Employee Handbook", type: "PDF", size: "2.5 MB" },
          { name: "Company Policies", type: "PDF", size: "1.8 MB" },
          { name: "Benefits Guide", type: "PDF", size: "3.2 MB" },
        ].map((doc, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • {doc.size}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}