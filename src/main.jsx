import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { LanguageProvider } from "./i18n.jsx"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
