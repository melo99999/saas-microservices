import type { Metadata } from "next";
import { fetchApi } from "@/lib/fetch-api";
import { DashboardHeader } from "@/app/components/dashboard-header";
import { DashboardLayout } from "@/app/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Devices",
};

interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
}

interface DevicesResponse {
  devices: Device[];
}

export default async function Devices() {
  const { devices } = await fetchApi<DevicesResponse>("/api/emulation/devices");

  return (
    <DashboardLayout>
      <DashboardHeader />
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Devices</h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Emulated Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {devices.map((device) => (
                <li key={device.id} className="flex items-center justify-between p-2">
                  <span>{device.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    device.status === "online"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}>
                    {device.status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
