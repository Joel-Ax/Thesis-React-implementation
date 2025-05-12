// layouts/AppLayout.tsx
import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import MainLayout from "./MainLayout/MainLayout";

// Loading fallback component
const LoadingFallback = () => <div>Loading...</div>;

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="app">
        <Header cameraName="Camera Name" />
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <MainLayout isOpen={sidebarOpen}>
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </MainLayout>
      </div>
    </>
  );
};

export default AppLayout;
