import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
import Header from "./components/Header/Header";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import ReadingPage from "./pages/ReadingPage/ReadingPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchCurrentUser,
  refreshTokens,
  useAxiosInterceptor,
} from "./redux/auth/operations";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useAxiosInterceptor(); // 🔹 важливо викликати тут, щоб перехоплювати 401

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch((error) => {
          console.log("Failed to fetch user:", error);
        });
    } else {
      dispatch(refreshTokens())
        .unwrap()
        .then(() => {
          dispatch(fetchCurrentUser());
        })
        .catch((error) => {
          console.log("Failed to refresh token:", error);
        });
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/recommended" : "/register"} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/reading" element={<ReadingPage />} />
      </Routes>
    </>
  );
}

export default App;
