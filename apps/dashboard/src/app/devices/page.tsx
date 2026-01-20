"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/fetch-api";
import { DashboardHeader } from "@/app/components/dashboard-header";
import { DashboardLayout } from "@/app/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceCard } from "@/app/components/device-card";

interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
  userAgent: string;
}

interface DevicesResponse {
  devices: Device[];
}

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetchApi<DevicesResponse>("/api/emulation/devices")
      .then((data) => setDevices(data.devices))
      .catch(console.error);
  }, []);

  const handleDeviceUpdate = (updatedDevice: Device) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === updatedDevice.id ? updatedDevice : device
      )
    );
  };

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
            <ul className="space-y-4">
              {devices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onDeviceUpdate={handleDeviceUpdate}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
