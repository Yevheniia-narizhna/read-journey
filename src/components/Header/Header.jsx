import { NavLink, useLocation } from "react-router-dom";
import s from "./Header.module.css";
const Header = () => {
  const { pathname } = useLocation();
  const hideHeader = pathname === "/login" || pathname === "/register";

  if (hideHeader) return null;

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
      <div className={s.nameRound}>N</div>
      <div className={s.name}>Name</div>
      <button type="button" className={s.logOut}>
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
