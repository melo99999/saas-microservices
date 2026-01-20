"use client";

import { useEffect, useState } from "react";

interface EmulationProfile {
  id: string;
  name: string;
  fingerprint: {
    userAgent: string;
    platform: string;
    screenResolution: {
      width: number;
      height: number;
    };
  };
  identity: {
    username: string;
  };
  limits: {
    maxRequests: number;
  };
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function EmulationProfiles() {
  const [profiles, setProfiles] = useState<EmulationProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProfile, setNewProfile] = useState({
    name: "",
    userAgent: "",
    platform: "",
    width: 1920,
    height: 1080,
    username: "",
    maxRequests: 100,
  });
  const [editingProfile, setEditingProfile] = useState<EmulationProfile | null>(
    null
  );

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/emulation/profiles");
      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      const data = await response.json();
      setProfiles(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (id: string) => {
    try {
      const response = await fetch(`/api/emulation/profiles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }
      fetchProfiles(); // Refetch profiles to update the list
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleCreateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/emulation/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProfile.name,
          fingerprint: {
            userAgent: newProfile.userAgent,
            platform: newProfile.platform,
            screenResolution: {
              width: newProfile.width,
              height: newProfile.height,
            },
          },
          identity: {
            username: newProfile.username,
          },
          limits: {
            maxRequests: newProfile.maxRequests,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create profile");
      }
      fetchProfiles(); // Refetch profiles to update the list
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile) return;

    try {
      const response = await fetch(
        `/api/emulation/profiles/${editingProfile.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editingProfile.name,
            fingerprint: editingProfile.fingerprint,
            identity: editingProfile.identity,
            limits: editingProfile.limits,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      fetchProfiles(); // Refetch profiles to update the list
      setEditingProfile(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProfile(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {editingProfile ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="edit-name">Profile Name</label>
                <Input
                  id="edit-name"
                  placeholder="Profile Name"
                  value={editingProfile.name}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="edit-userAgent">User Agent</label>
                <Input
                  id="edit-userAgent"
                  placeholder="User Agent"
                  value={editingProfile.fingerprint.userAgent}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      fingerprint: {
                        ...editingProfile.fingerprint,
                        userAgent: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="edit-platform">Platform</label>
                <Input
                  id="edit-platform"
                  placeholder="Platform"
                  value={editingProfile.fingerprint.platform}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      fingerprint: {
                        ...editingProfile.fingerprint,
                        platform: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="edit-width">Screen Width</label>
                <Input
                  id="edit-width"
                  type="number"
                  placeholder="Screen Width"
                  value={editingProfile.fingerprint.screenResolution.width}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      fingerprint: {
                        ...editingProfile.fingerprint,
                        screenResolution: {
                          ...editingProfile.fingerprint.screenResolution,
                          width: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="edit-height">Screen Height</label>
                <Input
                  id="edit-height"
                  type="number"
                  placeholder="Screen Height"
                  value={editingProfile.fingerprint.screenResolution.height}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      fingerprint: {
                        ...editingProfile.fingerprint,
                        screenResolution: {
                          ...editingProfile.fingerprint.screenResolution,
                          height: parseInt(e.target.value),
                        },
                      },
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="edit-username">Username</label>
                <Input
                  id="edit-username"
                  placeholder="Username"
                  value={editingProfile.identity.username}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      identity: {
                        ...editingProfile.identity,
                        username: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="edit-maxRequests">Max Requests</label>
                <Input
                  id="edit-maxRequests"
                  type="number"
                  placeholder="Max Requests"
                  value={editingProfile.limits.maxRequests}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      limits: {
                        ...editingProfile.limits,
                        maxRequests: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
              <div className="space-x-2">
                <Button>Update Profile</Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Create New Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div>
                <label htmlFor="name">Profile Name</label>
                <Input
                  id="name"
                  placeholder="Profile Name"
                  value={newProfile.name}
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="userAgent">User Agent</label>
                <Input
                  id="userAgent"
                  placeholder="User Agent"
                  value={newProfile.userAgent}
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, userAgent: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="platform">Platform</label>
                <Input
                  id="platform"
                  placeholder="Platform"
                  value={newProfile.platform}
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, platform: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="width">Screen Width</label>
                <Input
                  id="width"
                  type="number"
                  placeholder="Screen Width"
                  value={newProfile.width}
                  onChange={(e) =>
                    setNewProfile({
                      ...newProfile,
                      width: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="height">Screen Height</label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Screen Height"
                  value={newProfile.height}
                  onChange={(e) =>
                    setNewProfile({
                      ...newProfile,
                      height: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  placeholder="Username"
                  value={newProfile.username}
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="maxRequests">Max Requests</label>
                <Input
                  id="maxRequests"
                  type="number"
                  placeholder="Max Requests"
                  value={newProfile.maxRequests}
                  onChange={(e) =>
                    setNewProfile({
                      ...newProfile,
                      maxRequests: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <Button>Create Profile</Button>
            </form>
        </CardContent>
      </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Existing Profiles</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {profiles.length === 0 && <p>No profiles found.</p>}
            {profiles.map((profile) => (
              <li key={profile.id} className="flex items-center justify-between">
                <span>{profile.name}</span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setEditingProfile(profile)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteProfile(profile.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
