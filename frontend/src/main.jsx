import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import 'sweetalert2/src/sweetalert2.scss'
import "./index.css";
import User from "./User.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <User/>
  </StrictMode>
);
