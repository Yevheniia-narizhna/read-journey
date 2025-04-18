import { Link } from "react-router-dom";
import s from "./AppDescription.module.css";

const AppDescription = () => {
  return (
    <div className={s.addDescrCont}>
      <h3 className={s.addDescrTitle}>Start your workout</h3>
      <div className={s.addDescrFlex}>
        <div className={s.addDescrSmCont}>
          <img src="/src/img/1-img.png" />
          <p className={s.addDescrText}>
            <span>Create a personal library: </span>
            add the books you intend to read to it.
          </p>
        </div>
        <div className={s.addDescrSmCont}>
          <img src="/src/img/2-img.png" />
          <p className={s.addDescrText}>
            <span>Create your first workout: </span>
            define a goal, choose a period, start training.
          </p>
        </div>
      </div>
      <div className={s.links}>
        <Link to="/library" className={s.link}>
          My Library
        </Link>
        <Link to="/library" className={s.link}>
          <svg className={s.arrow}>
            <use href="/src/assets/symbol-defs.svg#icon-log-in" />
          </svg>
        </Link>
      </div>
    </div>
  );
};
export default AppDescription;
