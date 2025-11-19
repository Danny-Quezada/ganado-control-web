import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { useThemeStore } from "./stores/ThemeStore.ts";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PublicRoute from "./ui/routes/PublicRoutes.tsx";
import SignUpPage from "./ui/pages/SignUpPage.tsx";
import LoginPage from "./ui/pages/LoginPage.tsx";
import CowPage from "./ui/pages/Cow/CowPage.tsx";
import PrivateRoute from "./ui/routes/ProtectedRoute.tsx";
import GanadoControlLayout from "./ui/pages/Layout/GanadoControlLayout.tsx";
const queryClient = new QueryClient();
const Root = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

            <Route path="/" element={<PrivateRoute />}>
            <Route element={<GanadoControlLayout />}>
              <Route index element={<Navigate to="cow" replace />} />
              <Route path="cow" element={<CowPage />} />
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
