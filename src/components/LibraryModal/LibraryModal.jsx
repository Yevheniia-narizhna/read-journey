import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchBookDetails } from "../../redux/library/operations";
import { setBookId } from "../../redux/library/slice";

const LibraryModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookId = book._id; // Отримуємо ID книги безпосередньо з переданого book об'єкта

  const handleStartReading = () => {
    if (!bookId) {
      console.error("Book ID is missing or invalid.");
      return;
    }

    dispatch(setBookId(bookId)); // просто зберігає bookId у Redux
    localStorage.setItem("currentBookId", bookId);
    navigate("/reading"); // одразу переходимо на сторінку
    onClose(); // закриваємо модалку
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <img src={book.imageUrl} alt={book.title} width="150" />
        <p>Pages: {book.totalPages}</p>
        <button onClick={handleStartReading}>Start reading</button>
      </div>
    </div>
  );
};

export default LibraryModal;
