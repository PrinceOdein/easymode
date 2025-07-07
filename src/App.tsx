// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import { TamboProvider } from "@tambo-ai/react";
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
)

function App() {
  return (
   <SessionContextProvider supabaseClient={supabase}>
     <TamboProvider apiKey={import.meta.env.VITE_TAMBO_API_KEY || ""}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </TamboProvider>
   </SessionContextProvider>
  );
}

export default App;
