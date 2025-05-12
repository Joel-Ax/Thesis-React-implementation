import React, { useEffect } from "react";
import { useBakeryManager } from "../components/context/BakeryContext";
import "./BakeryDashboard.css";

const DashboardPage: React.FC = () => {
  const { state, fetchParameters, clearError } = useBakeryManager();
  const { parameters, loading, error } = state;

  useEffect(() => {
    // Refresh bakery data when component mounts
    fetchParameters();
  }, [fetchParameters]);

  // Handle retry button click
  const handleRetry = () => {
    clearError();
    fetchParameters();
  };

  if (loading && !parameters) {
    return (
      <div className="bakery-loading-container">
        <div className="bakery-loading-content">
          <div className="bakery-spinner" role="status">
            <span className="bakery-visually-hidden">Loading...</span>
          </div>
          <p className="bakery-loading-text">Loading bakery data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bakery-error-container">
        <div className="bakery-error-content">
          <h2 className="bakery-error-title">Error Loading Data</h2>
          <p className="bakery-error-message">{error}</p>
          <button onClick={handleRetry} className="bakery-retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!parameters) {
    return (
      <div className="bakery-empty-container">
        <div className="bakery-empty-content">
          <h2 className="bakery-empty-title">No bakery data available</h2>
          <button
            onClick={() => fetchParameters()}
            className="bakery-load-button"
          >
            Load Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bakery-dashboard-container">
      <div className="bakery-dashboard-card">
        <div className="bakery-dashboard-header">
          <h1 className="bakery-title">{parameters.bakeryName}</h1>
          <p className="bakery-year">Est. {parameters.establishedYear}</p>

          <div className="bakery-status-container">
            <span
              className={`bakery-status-badge ${
                parameters.storeStatus === "OPEN"
                  ? "bakery-status-open"
                  : "bakery-status-closed"
              }`}
            >
              {parameters.storeStatus}
            </span>
          </div>
        </div>

        <div className="bakery-dashboard-content">
          <div className="bakery-dashboard-grid">
            <div className="bakery-data-card">
              <h2 className="bakery-section-title">Performance</h2>
              <div className="bakery-data-row">
                <span className="bakery-data-label">Daily Sales:</span>
                <span className="bakery-data-value bakery-sales-value">
                  ${parameters.dailySales.toFixed(2)}
                </span>
              </div>
              <div className="bakery-data-row">
                <span className="bakery-data-label">
                  Customer Satisfaction:
                </span>
                <div className="bakery-rating-container">
                  <span className="bakery-rating-value">
                    {parameters.customerSatisfaction.toFixed(1)}
                  </span>
                  <div className="bakery-star-container">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.round(parameters.customerSatisfaction)
                            ? "bakery-star bakery-filled"
                            : "bakery-star"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bakery-data-card">
              <h2 className="bakery-section-title">Kitchen Details</h2>
              <div className="bakery-data-row">
                <span className="bakery-data-label">Kitchen Size:</span>
                <span className="bakery-data-value">
                  {parameters.kitchenWidth} sq ft
                </span>
              </div>
              <div className="bakery-data-row">
                <span className="bakery-data-label">Ceiling Height:</span>
                <span className="bakery-data-value">
                  {parameters.kitchenHeight} ft
                </span>
              </div>
            </div>
          </div>

          <div className="bakery-offerings">
            <h2 className="bakery-section-title">Bakery Offerings</h2>
            <div className="bakery-data-card">
              <div className="bakery-data-row">
                <span className="bakery-data-label">Specialty Flavor:</span>
                <span className="bakery-specialty-badge">
                  {parameters.specialtyFlavor}
                </span>
              </div>

              <div className="bakery-data-row">
                <span className="bakery-data-label">Organic Ingredients:</span>
                <span
                  className={`bakery-feature-badge ${
                    parameters.organicIngredients
                      ? "bakery-feature-yes"
                      : "bakery-feature-no"
                  }`}
                >
                  {parameters.organicIngredients ? "Yes" : "No"}
                </span>
              </div>

              <div className="bakery-data-row">
                <span className="bakery-data-label">Minimum Order:</span>
                <span className="bakery-data-value">
                  ${parameters.minimumOrderAmount.toFixed(2)}
                </span>
              </div>

              <h3 className="bakery-subsection-title">Menu Items:</h3>
              <div className="bakery-menu-grid">
                {parameters.menuItems.map((item, index) => (
                  <div key={index} className="bakery-menu-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bakery-action-container">
            <button
              onClick={() => fetchParameters()}
              className="bakery-refresh-button"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
