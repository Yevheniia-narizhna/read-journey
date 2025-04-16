import { NavLink, useLocation } from "react-router-dom";
import s from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, signOutUser } from "../../redux/auth/operations";
import { useEffect } from "react";
const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const hideHeader = pathname === "/login" || pathname === "/register";

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser()); // Отримуємо дані користувача при завантаженні компоненту
    }
  }, [dispatch, user]);

  if (hideHeader) return null;

  const handleLogout = () => {
    dispatch(fetchCurrentUser()) // Отримуємо дані користувача
      .unwrap()
      .then(() => {
        // Якщо користувач є, виконуємо логаут
        dispatch(signOutUser())
          .unwrap()
          .then(() => {
            window.location.href = "/login"; // Перенаправлення на сторінку входу
          })
          .catch((error) => {
            console.log("Logout failed:", error);
          });
      })
      .catch((error) => {
        console.log("Failed to fetch user:", error); // Якщо не вдалося отримати дані користувача
      });
  };

  return (
    <div className={s.headerCont}>
      <div className={s.logo}>
        <svg className={s.logoImg}>
          <use href="/src/assets/symbol-defs.svg#icon-icon-1" />
        </svg>
        <svg className={s.logoText}>
          <use href="/src/assets/symbol-defs.svg#icon-read-journey" />
        </svg>
      </div>
      <div className={s.contLinks}>
        <NavLink
          to="/recommended"
          className={({ isActive }) =>
            `${s.commonLink} ${isActive ? s.active : s.inactive}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            `${s.commonLink} ${isActive ? s.active : s.inactive}`
          }
        >
          My Library
        </NavLink>
      </div>
      <div className={s.nameRound}>
        {user?.name ? user.name.charAt(0).toUpperCase() : ""}
      </div>
      <div className={s.name}>{user.name}</div>
      <button type="button" onClick={handleLogout} className={s.logOut}>
        Log out
      </button>
      <div>
        <svg className={s.burger}>
          <use href="/src/assets/symbol-defs.svg#icon-menu-04" />
        </svg>
      </div>
    </div>
  );
};
export default Header;
