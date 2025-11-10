"use client";

import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";

interface PopupMessageProps {
  text: string;
  duration?: number;
  onClose?: () => void;
}

const PopupMessage = ({ text, duration = 3000, onClose }: PopupMessageProps) => {
  useEffect(() => {
    if (!text) {
      return;
    }

    const timer = window.setTimeout(() => {
      onClose?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [text, duration, onClose]);

  const portalTarget = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const existing = document.getElementById("popup-message-root");
    if (existing) {
      return existing;
    }
    const root = document.createElement("div");
    root.id = "popup-message-root";
    document.body.appendChild(root);
    return root;
  }, []);

  if (!text || !portalTarget) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center px-4">
      <div className="rounded-3xl border border-[#ffe89c]/80 bg-[#06031a]/95 px-8 py-10 text-center text-2xl font-semibold text-[#ffe89c] shadow-[0_35px_70px_rgba(6,3,26,0.65)] animate-connections-fade-out">
        {text}
      </div>
    </div>,
    portalTarget
  );
};

export default PopupMessage;


