import React from "react";
import ReactDOM from "react-dom";
import "./InactivityDialog.css";

interface InactivtyDialogProps {
  show: boolean;
  onResume?: () => void;
}

/**
 * Inactivty Dialog
 *
 * Modal overlay that appears when user inactivity is detected.
 * Uses React Portal to render at body level for proper stacking.
 */

const InactivtyDialog: React.FC<InactivtyDialogProps> = ({ show }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h3 className="dialog-title">Are you still there?</h3>
        <p className="dialog-message">
          We noticed you've been inactive for a while.
        </p>
      </div>
    </div>,
    document.body
  );
};

export default InactivtyDialog;
