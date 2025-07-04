import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useTambo } from "@tambo-ai/react";
import { lingo } from "@/lib/lingoClient"; // optional: only if you're using Lingo.dev

export default function Dashboard() {
  // 👤 Supabase: user info
  const [user, setUser] = useState<any>(null);

  // 🧠 Tambo: get the user's preferred UI mode
  const { uiMode } = useTambo({
    role: "beginner",     // or "expert" based on user settings
    device: "desktop",    // or detect from screen size
  });

  useEffect(() => {
    // 🔐 Fetch the currently logged-in user from Supabase
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to EasyMode</h1>
      
      {user ? (
        <p>Hello, {user.email}</p>
      ) : (
        <p>Loading user info...</p>
      )}

      <p>
        <strong>Interface Mode:</strong> {uiMode || "loading..."}
      </p>

      {/* 🧪 Optional: test Lingo.dev */}
      {/* <p>Translation: {await lingo.translate("Start Here", "fr")}</p> */}

      {uiMode === "simple" ? (
        <div style={{ border: "1px solid #ddd", padding: "1rem", marginTop: "1rem" }}>
          <h2>🧒 Beginner Interface</h2>
          <p>This layout is simplified for easier use.</p>
          {/* Add beginner-friendly UI components here */}
        </div>
      ) : (
        <div style={{ border: "1px solid #444", padding: "1rem", marginTop: "1rem" }}>
          <h2>🧠 Advanced Interface</h2>
          <p>This layout has all features available.</p>
          {/* Add full-featured components here */}
        </div>
      )}
    </div>
  );
}
