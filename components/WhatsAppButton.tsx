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
      <div className="flex items-center gap-3 bg-white rounded-lg shadow-lg px-5 py-4 border-l-4 border-red">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-ink">Got a question?</p>
          <p className="text-xs text-ink-soft">Message me on WhatsApp</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 bg-red hover:bg-red-deep text-white rounded-full transition-colors"
            aria-label="Message on WhatsApp"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378l-.361.214-3.741-.982.998 3.645-.235.364a9.864 9.864 0 001.478 5.18c.712 1.192 1.617 2.211 2.689 2.944l.456.272c1.456.818 3.028 1.255 4.649 1.255 5.048 0 9.28-4.231 9.28-9.28 0-2.422-.934-4.693-2.631-6.389-1.697-1.697-3.967-2.631-6.389-2.631z" />
            </svg>
          </a>
          <button
            onClick={handleDismiss}
            className="inline-flex items-center justify-center w-6 h-6 text-ink-faint hover:text-ink transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
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
