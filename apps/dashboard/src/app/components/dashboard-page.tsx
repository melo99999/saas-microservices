import { DashboardHeader } from "./dashboard-header";
import { DashboardLayout } from "./dashboard-layout";
import { MetricCards } from "./metric-cards";
import { RecentActivity } from "./recent-activity";
import { WeeklyChart } from "./weekly-chart";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  // This data could come from a database or API call in a real application
  const chartData = [
    { day: "Mon", value: 65, color: "hsl(var(--primary))" },
    { day: "Tue", value: 85, color: "hsl(var(--chart-1))" },
    { day: "Wed", value: 70, color: "hsl(var(--chart-2))" },
    { day: "Thu", value: 95, color: "hsl(var(--chart-3))" },
    { day: "Fri", value: 45, color: "hsl(var(--chart-4))" },
  ];

  return (
    <DashboardLayout>
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <h2 className="text-2xl font-bold tracking-tight p-6">Available Devices</h2>
              <div className="p-6">
                {/* Placeholder for device list */}
                <p>No devices available.</p>
              </div>
            </Card>
            <Card className="col-span-1">
              <h2 className="text-2xl font-bold tracking-tight p-6">Active Sessions</h2>
              <div className="p-6">
                {/* Placeholder for session list */}
                <p>No active sessions.</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
