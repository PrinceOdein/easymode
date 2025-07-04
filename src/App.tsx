// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import { TamboProvider } from "@tambo-ai/react";

function App() {
  return (
    <TamboProvider apiKey={import.meta.env.VITE_TAMBO_API_KEY || ""}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </TamboProvider>
  );
}

export default App;
