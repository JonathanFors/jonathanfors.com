"use client";

import { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed (within the 1-hour window)
    const isDismissed = getCookie("whatsapp_dismissed") === "true";
    setIsVisible(!isDismissed);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Set cookie to expire in 1 hour (3600 seconds)
    setCookie("whatsapp_dismissed", "true", 3600);
  };

  const whatsappUrl = "https://wa.me/351932286853?text=Hi%20Jonathan%2C%20I%20have%20a%20question";

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="flex items-center gap-4 bg-white shadow-lg px-5 py-4 border-l-4 border-red">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-ink">Got a question?</p>
          <p className="text-xs text-ink-soft">Message me on WhatsApp</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 bg-red hover:bg-red-deep text-white transition-colors font-bold text-lg"
            aria-label="Message on WhatsApp"
          >
            W
          </a>
          <button
            onClick={handleDismiss}
            className="inline-flex items-center justify-center text-ink-faint hover:text-ink transition-colors font-bold text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

function setCookie(name: string, value: string, seconds: number) {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}
