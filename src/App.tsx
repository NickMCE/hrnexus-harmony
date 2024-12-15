import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import Login from "./pages/Login";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import LeaveRequest from "./pages/LeaveRequest";
import ExpenseSubmission from "./pages/ExpenseSubmission";
import Documents from "./pages/Documents";
import PerformanceGoals from "./pages/PerformanceGoals";
import AddEmployee from "./pages/AddEmployee";
import PayrollManagement from "./pages/PayrollManagement";
import PerformanceReviews from "./pages/PerformanceReviews";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/hr-dashboard"
              element={
                <ProtectedRoute allowedRoles={["HR"]}>
                  <HRDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee-dashboard"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            {/* Employee Routes */}
            <Route
              path="/leave-request"
              element={
                <ProtectedRoute allowedRoles={["Employee", "HR"]}>
                  <LeaveRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expense-submission"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <ExpenseSubmission />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute allowedRoles={["Employee", "HR"]}>
                  <Documents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/performance-goals"
              element={
                <ProtectedRoute allowedRoles={["Employee"]}>
                  <PerformanceGoals />
                </ProtectedRoute>
              }
            />
            {/* HR Routes */}
            <Route
              path="/add-employee"
              element={
                <ProtectedRoute allowedRoles={["HR"]}>
                  <AddEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll"
              element={
                <ProtectedRoute allowedRoles={["HR"]}>
                  <PayrollManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/performance-reviews"
              element={
                <ProtectedRoute allowedRoles={["HR"]}>
                  <PerformanceReviews />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;