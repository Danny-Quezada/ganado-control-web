import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import supabase from "../../domain/db/SupabaseClient";

export default function PublicRoute() {
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setHasSession(!!data.session);
      setChecking(false);
    };

    checkSession();
  }, []);
  if (checking) {
    return null;
  }
  return hasSession ? <Navigate to="/" replace /> : <Outlet />;
}