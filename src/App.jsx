import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

// import RegisterPage from "./pages/RegisterPage/RegisterPage";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import RecommendedPage from "./pages/RecommendedPage/RecommendedPage";
import Header from "./components/Header/Header";
// import LibraryPage from "./pages/LibraryPage/LibraryPage";
// import ReadingPage from "./pages/ReadingPage/ReadingPage";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import {
  fetchCurrentUser,
  libraryApi,
  refreshTokens,
  useAxiosInterceptor,
} from "./redux/auth/operations";

const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const RecommendedPage = lazy(() =>
  import("./pages/RecommendedPage/RecommendedPage")
);
const LibraryPage = lazy(() => import("./pages/LibraryPage/LibraryPage"));
const ReadingPage = lazy(() => import("./pages/ReadingPage/ReadingPage"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserBooks } from "./redux/library/operations";
function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useAxiosInterceptor(); // 🔹 важливо викликати тут, щоб перехоплювати 401

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // 🔹 Додаємо Authorization хедер
      libraryApi.defaults.headers["Authorization"] = `Bearer ${token}`;

      dispatch(fetchCurrentUser())
        .unwrap()
        .then(() => dispatch(getUserBooks()))
        .catch((error) => {
          console.log("Failed to fetch user:", error);
        });
    } else {
      dispatch(refreshTokens())
        .unwrap()
        .then((result) => {
          // 🔹 Додаємо Authorization хедер після оновлення токену
          libraryApi.defaults.headers[
            "Authorization"
          ] = `Bearer ${result.token}`;

          dispatch(fetchCurrentUser());
          dispatch(getUserBooks());
        })
        .catch((error) => {
          console.log("Failed to refresh token:", error);
        });
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
