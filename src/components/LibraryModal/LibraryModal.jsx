import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchBookDetails } from "../../redux/library/operations";
import { setBookId } from "../../redux/library/slice";
// import s from "./LibraryModal.module.css";
import s from "../BookModal/BookModal.module.css";

const LibraryModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookId = book._id;

  const handleStartReading = () => {
    if (!bookId) {
      console.error("Book ID is missing or invalid.");
      return;
    }

    dispatch(setBookId(bookId));
    localStorage.setItem("currentBookId", bookId);
    navigate("/reading");
    onClose();
  };
  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          <img src="/src/img/x.png" />
        </button>
        <div className={s.bookContImg}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className={s.imgBook}
            width="100"
          />
        </div>
        <h3 className={s.truncate}>{book.title}</h3>
        <p className={s.author}>{book.author}</p>
        <p className={s.pages}>{book.totalPages} pages</p>
        <button className={s.btnMod} onClick={handleStartReading}>
          Start reading
        </button>
      </div>
    </div>
  );
};

export default LibraryModal;
