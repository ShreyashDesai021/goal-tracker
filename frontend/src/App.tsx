import AppRouter
from "./routes/AppRouter";

import Navbar
from "./components/Navbar";

import {
  useLocation,
} from "react-router-dom";

function AppContent() {

  const location =
    useLocation();

  const hideNavbar =
    location.pathname ===
    "/login";

  return (
    <>

      {!hideNavbar && (
        <Navbar />
      )}

      <AppRouter />

    </>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;