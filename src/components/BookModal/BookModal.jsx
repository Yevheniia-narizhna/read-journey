import { useDispatch } from "react-redux";
import {
  addBookToLibrary,
  getRecommendedBooks,
} from "../../redux/library/operations";

const BookModal = ({ book, onClose, currentPage }) => {
  const dispatch = useDispatch();
  const handleAddToLibrary = () => {
    dispatch(getRecommendedBooks({ title: "", author: "", page: currentPage }));
    dispatch(addBookToLibrary(book._id));

    console.log(`Adding ${book.title} to library`);
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
