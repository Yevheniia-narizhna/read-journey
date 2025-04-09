import { Route, Routes } from "react-router-dom";
import "./App.css";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
import Header from "./components/Header/Header";
import LibraryPage from "./pages/LibraryPage/LibraryPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </>
  );
}

export default App;
