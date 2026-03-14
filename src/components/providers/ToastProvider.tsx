"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster 
      position="bottom-center" 
      toastOptions={{ 
        style: { zIndex: 999999 },
        duration: 5000,
      }} 
    />
  );
}
