"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PopupMessageProps {
  text: string;
  duration?: number;
  onClose?: () => void;
  requireDismiss?: boolean; // Om true, måste användaren klicka för att stänga
}

const PopupMessage = ({
  text,
  duration = 7000,
  onClose,
  requireDismiss = false,
}: PopupMessageProps) => {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  // Skapa / hämta root-elementet på klienten
  useEffect(() => {
    if (typeof window === "undefined") return;

    let root = document.getElementById("popup-message-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "popup-message-root";
      document.body.appendChild(root);
    }

    setPortalTarget(root);
  }, []);

  // Auto-stäng popup efter duration (endast om requireDismiss är false)
  useEffect(() => {
    if (!text || requireDismiss) return;
    if (duration === undefined || duration <= 0) return;

    const timer = window.setTimeout(() => {
      onClose?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [text, duration, onClose, requireDismiss]);

  const handleClose = () => {
    onClose?.();
  };

  if (!text || !portalTarget) {
    return null;
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: requireDismiss ? "auto" : "none",
        backgroundColor: requireDismiss ? "rgba(0,0,0,0.6)" : "transparent",
        backdropFilter: requireDismiss ? "blur(4px)" : "none",
      }}
    >
      <div
        style={{
          position: "relative",
          pointerEvents: "auto",
          backgroundColor: "#ffffff",
          borderRadius: 16,
          padding: "24px 32px",
          maxWidth: 480,
          width: "90%",
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
          textAlign: "center",
        }}
      >
        {requireDismiss && (
          <button
            onClick={handleClose}
            aria-label="Stäng"
            style={{
              position: "absolute",
              top: 12,
              right: 16,
              border: "none",
              background: "transparent",
              fontSize: 20,
              cursor: "pointer",
              color: "#555",
            }}
          >
            ×
          </button>
        )}

        <p
          style={{
            margin: 0,
            fontSize: 18,
            lineHeight: 1.4,
            color: "#222",
          }}
        >
          {text}
        </p>
      </div>
    </div>,
    portalTarget
  );
};

export default PopupMessage;
