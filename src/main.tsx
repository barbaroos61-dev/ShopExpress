import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize mock data
console.log("Frontend initialized with mock API");

createRoot(document.getElementById("root")!).render(<App />);