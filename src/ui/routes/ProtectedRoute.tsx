import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../domain/db/SupabaseClient";
import useUserStore from "../../stores/UserStore";
import Logo from "../components/Logo";

export default function PrivateRoute() {
  const { signOut } = useUserStore();
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  // // useEffect(() => {
  // //   const checkSession = async () => {
  // //     const { data } = await supabase.auth.getSession();

  // //     if (data.session) {
  // //       setHasSession(true);
  // //     } else {
  // //       signOut();
  // //       setHasSession(false);
  // //     }

  // //     setChecking(false);
  // //   };

  // //   checkSession();

  // //   const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
  // //     if (!session) {
  // //       signOut();
  // //       setHasSession(false);
  // //     } else {
  // //       setHasSession(true);
  // //     }
  // //   });

  // //   return () => listener.subscription.unsubscribe();
  // // }, [signOut]);

  // // // Mostrar loading
  // // if (checking) {
  // //   return (
  // //     <div className="flex justify-center items-center h-screen">
  // //       <Logo />
  // //     </div>
  // //   );
  // // }

  // // Redirección controlada
  // if (!hasSession) {
  //   return <Navigate to="/login" replace />;
  // }

  return <Outlet />;
}