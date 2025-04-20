import { useState } from "react";
import s from "./ModalSuccess.module.css";
const ModalSuccess = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true); // Стан для модалки

  // Функція для закриття модалки
  const closeModal = () => {
    setIsOpen(false);
  };

  // Функція для закриття при натисканні на бекдроп
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen) return null;
  return (
    <div className={s.modSuccess} onClick={handleBackdropClick}>
      <div className={s.modSuccessCont}>
        <button className={s.closeButton} onClick={onClose}>
          <img src="/img/x.png" />
        </button>
        <picture>
          <source
            srcSet="/img/super-small-x1.png 1x, /img/super-small-x2.png 2x"
            media="(max-width: 767px)"
          />
          <source
            srcSet="/img/super-big-x1.png 1x, /img/super-big-x2.png 2x"
            media="(min-width: 768px)"
          />
          <img src="/img/super-small-x1.png" alt="Recommended Book" />
        </picture>
        <h3 className={s.titleMod}>Good job</h3>
        <p className={s.textMod}>
          Your book is now in <span className={s.textModSp}>the library!</span>{" "}
          The joy knows no bounds and now you can start your training
        </p>
      </div>
    </div>
  );
};
export default ModalSuccess;
