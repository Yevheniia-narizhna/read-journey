import { useDispatch, useSelector } from "react-redux";
import {
  addBookToLibrary,
  getRecommendedBooks,
  getUserBooks,
} from "../../redux/library/operations";
import s from "./BookModal.module.css";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
// import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("modal-root");

const BookModal = ({ book, onClose, currentPage }) => {
  const dispatch = useDispatch();
  const userBooks = useSelector((state) => state.books.books);
  // const navigate = useNavigate();

  const handleAddToLibrary = () => {
    // console.log(userBooks);
    const alreadyInLibrary = userBooks.some(
      (b) => b._id === book._id || b.title === book.title
    );

    if (alreadyInLibrary) {
      toast.info("📚 already in library!");
      return;
    }

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
        toast.info(`📚 ${error}`);
      });
    // navigate("/library");
    dispatch(getRecommendedBooks({ title: "", author: "", page: currentPage }));
  };

  return createPortal(
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeButton} onClick={onClose}>
          <img src="/img/x.png" />
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
    </div>,
    modalRoot
  );
};

export default BookModal;
