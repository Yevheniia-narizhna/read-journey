import { NavLink, useLocation } from "react-router-dom";
import s from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, signOutUser } from "../../redux/auth/operations";
import { useEffect, useState } from "react";
import { clearBooks } from "../../redux/library/slice";

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const hideHeader = pathname === "/login" || pathname === "/register";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  if (hideHeader) return null;

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(fetchCurrentUser())
      .unwrap()
      .then(() => {
        dispatch(clearBooks());
        dispatch(signOutUser())
          .unwrap()
          .then(() => {
            window.location.href = "/login";
          })
          .catch((error) => {
            console.log("Logout failed:", error);
          });
      })
      .catch((error) => {
        console.log("Failed to fetch user:", error);
      });
  };

  return (
    <section className={s.headerSect}>
      <div className={s.headerCont}>
        <div className={s.logo}>
          <svg className={s.logoImg}>
            <use href="/symbol-defs.svg#icon-icon-1" />
          </svg>
          <svg className={s.logoText}>
            <use href="/symbol-defs.svg#icon-read-journey" />
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
        <div className={s.nameContBtn}>
          <div className={s.nameRound}>
            {(user?.name ? user.name[0] : "U").toUpperCase()}
          </div>
          <div className={s.name}>{user?.name || "User"}</div>
          <button type="button" onClick={handleLogout} className={s.logOut}>
            Log out
          </button>
        </div>
        <button className={s.burgerBtn} onClick={toggleModal}>
          <svg className={s.burger}>
            <use href="/symbol-defs.svg#icon-menu-04" />
          </svg>
        </button>
      </div>
      {isModalOpen && (
        <div className={s.modalBackdrop} onClick={() => setIsModalOpen(false)}>
          <div
            className={`${s.modal} ${isModalOpen ? s.open : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={s.closeButtonModal} onClick={toggleModal}>
              <img src="/img/x.png" />
            </button>
            <div className={s.modalContent}>
              <div className={s.contLink}>
                <NavLink
                  to="/recommended"
                  className={({ isActive }) =>
                    `${s.comLink} ${s.width} ${
                      isActive ? s.active : s.inactive
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/library"
                  className={({ isActive }) =>
                    `${s.comLink} ${isActive ? s.active : s.inactive}`
                  }
                >
                  My Library
                </NavLink>
              </div>
              <button type="button" onClick={handleLogout} className={s.logout}>
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Header;
