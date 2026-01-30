// src/components/ModalAlert.jsx
import React from "react";

const ModalAlert = ({ show, onClose, message }) => {
  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0">
          <div className="modal-header bg-warning text-dark">
            <h5 className="modal-title fw-bold">ATENCIÓN</h5>
            <button
              className="btn-close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body text-center p-4">
            <p className="fs-5 mb-0">{message}</p>
          </div>

          <div className="modal-footer border-0 justify-content-center">
            <button
              className="btn btn-warning fw-bold"
              onClick={onClose}
            >
              ACEPTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
