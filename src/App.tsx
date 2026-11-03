import { HashRouter } from "react-router-dom";
import { ProgressProvider } from "@/hooks/ProgressContext";
import { AppRoutes } from "@/routes";

/**
 * HashRouter is used so the app works when served as a single static file
 * (no server-side route handling needed) and survives page refreshes.
 */
export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ProgressProvider>
  );
}
