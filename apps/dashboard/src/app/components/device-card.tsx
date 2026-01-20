"use client";

import { useState } from "react";
import { fetchApi } from "@/lib/fetch-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Device {
  id: string;
  name: string;
  status: "online" | "offline";
  userAgent: string;
}

interface DeviceCardProps {
  device: Device;
  onDeviceUpdate: (device: Device) => void;
}

export function DeviceCard({ device, onDeviceUpdate }: DeviceCardProps) {
  const [userAgent, setUserAgent] = useState(device.userAgent);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const updatedDevice = await fetchApi<Device>(
      `/api/emulation/devices/${device.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userAgent }),
      }
    );
    onDeviceUpdate(updatedDevice);
    setIsEditing(false);
  };

  return (
    <li className="border-b p-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{device.name}</span>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            device.status === "online"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {device.status}
        </span>
      </div>
      {isEditing ? (
        <div className="mt-2">
          <Input
            data-testid={`user-agent-input-${device.id}`}
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleSave} size="sm">
            Save
          </Button>
          <Button
            onClick={() => setIsEditing(false)}
            variant="ghost"
            size="sm"
            className="ml-2"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <p
          className="text-sm text-gray-500 mt-1 cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {device.userAgent}
        </p>
      )}
    </li>
  );
}
