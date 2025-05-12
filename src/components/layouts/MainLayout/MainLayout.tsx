import React, { ReactNode } from "react";
import "./MainLayout.css";

interface MainLayoutProps {
  children: ReactNode;
  isOpen: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, isOpen }) => {
  const mainContentClass = isOpen ? "content-expanded" : "content-collapsed";

  return <div className={`main-layout ${mainContentClass}`}>{children}</div>;
};

export default MainLayout;
