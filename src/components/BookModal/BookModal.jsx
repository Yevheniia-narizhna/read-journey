import { useDispatch } from "react-redux";
import {
  addBookToLibrary,
  getRecommendedBooks,
  getUserBooks,
} from "../../redux/library/operations";

const BookModal = ({ book, onClose, currentPage }) => {
  const dispatch = useDispatch();
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

    dispatch(getRecommendedBooks({ title: "", author: "", page: currentPage }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <img src={book.imageUrl} alt={book.title} width="150" />
        <p>Pages: {book.totalPages}</p>
        <button onClick={handleAddToLibrary}>Add to Library</button>
      </div>
    </div>
  );
};

export default BookModal;
