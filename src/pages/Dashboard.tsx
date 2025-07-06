// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface Profile {
  id: string;
  email: string;
  created_at: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ─────────────────────────────────────────────
  // 1. Fetch auth user → then fetch row in public.users
  // ─────────────────────────────────────────────
  useEffect(() => {
    const loadProfile = async () => {
      const { data: authData, error: authErr } = await supabase.auth.getUser();
      if (authErr || !authData?.user) {
        console.error("Not logged in", authErr);
        navigate("/");          // Back to login if no session
        return;
      }

      // Query your users table for this user's row
      const { data: row, error: rowErr } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (rowErr) {
        console.error("DB fetch error:", rowErr.message);
      } else {
        setProfile(row as Profile);
      }
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  // ─────────────────────────────────────────────
  // 2. Sign‑out helper
  // ─────────────────────────────────────────────
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // ─────────────────────────────────────────────
  // 3. Render
  // ─────────────────────────────────────────────
  if (loading) return <p className="p-10 text-white">Loading profile…</p>;

  if (!profile)
    return (
      <p className="p-10 text-red-400">
        Could not find your profile. Try logging out and back in.
      </p>
    );

  return (
    <div className="min-h-screen px-8 py-12 text-white">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="space-y-2 bg-gray-800 p-6 rounded-lg max-w-md">
        <p>
          <span className="font-semibold">Email:</span> {profile.email}
        </p>
        <p>
          <span className="font-semibold">User ID:</span> {profile.id}
        </p>
        <p>
          <span className="font-semibold">Joined:</span>{" "}
          {new Date(profile.created_at).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 px-5 py-2 bg-red-600 hover:bg-red-700 rounded"
      >
        Log out
      </button>
    </div>
  );
}
