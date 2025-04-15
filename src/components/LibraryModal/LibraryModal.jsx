import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBookDetails } from "../../redux/library/operations";

const LibraryModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookId = book._id; // Отримуємо ID книги безпосередньо з переданого book об'єкта

  const handleStartReading = () => {
    console.log("Book ID before dispatch:", bookId);

    if (!bookId) {
      console.error("Book ID is missing or invalid.");
      return;
    }

    dispatch(fetchBookDetails(bookId))
      .then(() => {
        navigate(`/reading`);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        // Можна відобразити повідомлення про помилку
      });

    onClose();
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
