import { useDispatch } from "react-redux";
import {
  addBookToLibrary,
  getRecommendedBooks,
  getUserBooks,
} from "../../redux/library/operations";
import s from "./BookModal.module.css";
// import { useNavigate } from "react-router-dom";

const BookModal = ({ book, onClose, currentPage }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleAddToLibrary = () => {
    dispatch(addBookToLibrary(book._id))
      .unwrap()
      .then(() => {
        console.log("✅ Книгу додано:", book.title);
        dispatch(getUserBooks())
          .unwrap()
          .then((data) => {
            console.log("📚 Моя бібліотека після додавання:", data);
          });
      })
      .catch((error) => {
        console.log("❌ Помилка при додаванні:", error);
      });
    // navigate("/library");
    dispatch(getRecommendedBooks({ title: "", author: "", page: currentPage }));
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
        <button className={s.btnMod} onClick={handleAddToLibrary}>
          Add to Library
        </button>
      </div>
    </div>
  );
};

export default BookModal;
