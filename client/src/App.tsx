import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReportPage from "./pages/ReportPage";
import Auth from "./pages/Auth";
import { useUser } from "./contexts/UserContext";


const App: React.FC = () => {
  {/* hide header and footer for auth */}
  const isAuthPage = window.location.pathname === "/login";
  const { username } = useUser();
  if (!username) {
    return <Auth />;
  }


  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportPage />} />
        {/* <Route path="/login" element={<Auth />} /> */}
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
