// import { createPortal } from "react-dom";
import s from "./ModalDone.module.css";

const ModalDone = ({ onClose }) => {
  return (
    <div className={s.successModal} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          <img src="/img/x.png" />
        </button>
        <div className={s.quoteCont}>
          <div className={s.quoteImg}>
            <picture>
              <source
                srcSet="/img/books-small-x1.png 1x, /img/books-small-x2.png 2x"
                media="(max-width: 767px)"
              />
              <source
                srcSet="/img/books-big-x1.png 1x, /img/books-big-x2.png 2x"
                media="(min-width: 768px)"
              />
              <img src="/img/books-small-x1.png" alt="Recommended Book" />
            </picture>
          </div>
          <div>
            <h4 className={s.doneTitle}>The book is read</h4>
            <p className={s.doneText}>
              It was an
              <span>exciting journey</span>, where each page revealed new
              horizons, and the characters became inseparable friends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalDone;
