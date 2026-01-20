import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfileTable } from "@/components/ui/profile-table";

export const metadata: Metadata = {
  title: "Emulation - JMSN965 cloud",
};

async function getProfiles() {
  const res = await fetch("http://localhost:3024/emulation/api/profiles", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Emulation() {
  const profiles = await getProfiles();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emulation</CardTitle>
        <CardDescription>
          Manage your browser profiles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProfileTable data={profiles} />
      </CardContent>
    </Card>
  );
}
