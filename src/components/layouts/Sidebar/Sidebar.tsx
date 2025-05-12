import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  label: string;
  routeName: string;
  icon: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  // Mock menu items
  const menuItems: MenuItem[] = [
    { label: "Dashboard", routeName: "dashboard", icon: "📊" },
    { label: "Analytics", routeName: "analytics", icon: "📈" },
    { label: "Settings", routeName: "settings", icon: "⚙️" },
    { label: "Help", routeName: "help", icon: "❓" },
  ];

  return (
    <div className={`sidebar ${!isOpen ? "sidebar-closed" : ""}`}>
      <div className="content">
        <button
          onClick={toggleSidebar}
          className={`menu-button ${!isOpen ? "sidebar-closed" : ""}`}
        >
          <div className="button-content">
            <span className={`arrow-icon ${isOpen ? "rotate" : ""}`}>→</span>
          </div>
        </button>

        <nav className="navigation">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="menu-item">
                <Link to={`/${item.routeName}`} className="menu-link">
                  <span className="icon">{item.icon}</span>
                  <span className="menu-text">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
