import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";

import {
  CatchBoundary,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CatchBoundary getResetKey={() => "reset"} onCatch={(e) => console.log(e)}>
      <RouterProvider router={router} />
      <App />
    </CatchBoundary>
  </React.StrictMode>
);
