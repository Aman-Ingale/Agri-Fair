"use client";
import { useState } from "react";

export default function Modal(isModal,Obj) {
  const [isOpen, setIsOpen] = useState(isModal);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          {/* Modal Box */}
          <div className="bg-white rounded-2xl shadow-lg w-1/4 p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-3">{Obj?.title || " "}</h2>
            <p className="text-gray-600 mb-4">
              This is a popup modal in React + Tailwind.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
