"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  role: string;
  status: string;
  emailVerified: boolean;
}

export function ProfileSettings() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [profile, setProfile] = React.useState<ProfileData | null>(null);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  React.useEffect(() => {
    fetch("/api/users/me")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(({ data }) => {
        setProfile(data);
        setName(data.name ?? "");
        setPhone(data.phone ?? "");
        setAvatar(data.avatar ?? "");
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone, avatar }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Role: {profile.role} &middot; Status: {profile.status}
        </p>
      </div>

      <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />

      <Input label="Email" type="email" value={profile.email} readOnly className="opacity-60" />

      <Input label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" />

      <Input label="Avatar URL" type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." />

      <Button onClick={handleSave} loading={saving}>
        <Save className="h-4 w-4" />
        Save Profile
      </Button>
    </div>
  );
}