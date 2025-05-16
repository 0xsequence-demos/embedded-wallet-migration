import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThirdwebProvider } from "thirdweb/react";

function MainLayout() {
  return (
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainLayout />
  </StrictMode>
);
