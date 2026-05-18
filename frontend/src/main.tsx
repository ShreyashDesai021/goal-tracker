import {
  StrictMode,
} from "react";

import {
  createRoot,
} from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  Toaster,
} from "react-hot-toast";

import "./index.css";
import App from "./App.tsx";

createRoot(
  document.getElementById(
    "root"
  )!
).render(
  <StrictMode>

    <BrowserRouter>

      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          style: {
            borderRadius:
              "12px",
            background:
              "#fff",
            color:
              "#111827",
            padding:
              "14px 18px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.12)",
          },

          success: {
            iconTheme: {
              primary:
                "#16a34a",
              secondary:
                "#fff",
            },
          },

          error: {
            iconTheme: {
              primary:
                "#dc2626",
              secondary:
                "#fff",
            },
          },
        }}
      />

    </BrowserRouter>

  </StrictMode>
);