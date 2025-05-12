/**
 * Router configuration enabling client-side navigation in this singl-page application.
 * Using React Router with has routing for compatibility to mimic the camera system in my corresponding Vue application.
 */
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";

const DashboardPage = lazy(() => import("../pages/BakeryDashboard"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const AppRouter = () => {
  return (
    <Routes>
      {/* All routes go through AppLayout */}
      <Route element={<AppLayout />}>
        {/* Redirect from root to dashboardpage */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        {/* 404 - Catch all route for routes that does not exist */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
