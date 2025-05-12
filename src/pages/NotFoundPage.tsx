import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page not found</h1>
      <p>The page you're trying to reach does not exist har has bee moved.</p>
      <Link to="/dashboard" className="back-link">
        Go back to the home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
