import React from "react";
import "./Header.css";

interface HeaderProps {
  cameraName: string;
}

const Header: React.FC<HeaderProps> = ({ cameraName }) => {
  // Mock the image source
  const imageUrl: string = "/logo.png"; // In a real app, you'd import this

  return (
    <header className="header">
      <img src={imageUrl} alt="Company Logo" className="logo" />
      <h2 className="cameraName">{cameraName}</h2>
    </header>
  );
};

export default Header;
