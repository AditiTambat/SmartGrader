// Components/Modal.js
import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          textAlign: "center",
        }}
      >
        {children}
        <button
          onClick={onClose}
          style={{
            marginTop: "15px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
