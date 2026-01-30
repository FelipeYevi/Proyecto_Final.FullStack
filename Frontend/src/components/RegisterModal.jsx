import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ show, message, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 border-0">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title fw-bold">Registro</h5>
            <button className="btn-close btn-close-white" onClick={onClose} />
          </div>
          <div className="modal-body text-center p-4">
            <p className="fs-5">{message}</p>
          </div>
          <div className="modal-footer border-0 justify-content-center">
            <button
              className="btn btn-primary m-1"
              onClick={() => {
                onClose();
                navigate("/login"); 
              }}
            >
              Ir al login
            </button>
            <button
              className="btn btn-secondary m-1"
              onClick={() => {
                onClose();
                navigate("/"); 
              }}
            >
              Ir al home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
