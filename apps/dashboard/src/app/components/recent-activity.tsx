"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchApi } from "@/lib/fetch-api";

interface Activity {
  id: string;
  name: string;
  action: string;
  timestamp: string;
}

interface ActivityResponse {
  activities: Activity[];
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchApi<ActivityResponse>("/api/dashboard/activity")
      .then((data) => setActivities(data.activities.slice(0, 6)))
      .catch(console.error);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions from your customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">
                {new Date(activity.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
