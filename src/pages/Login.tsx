import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Login() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the login link!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold text-center">Login</h1>
            <p className="text-muted-foreground text-center">
              Enter your email to receive a magic login link.
            </p>

            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={loading || !email}
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </Button>

            {message && (
              <p className="text-sm text-center text-muted-foreground">
                {message}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
