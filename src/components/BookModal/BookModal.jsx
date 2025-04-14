import { useDispatch } from "react-redux";
import { addBookToLibrary } from "../../redux/library/operations";

const BookModal = ({ book, onClose }) => {
  const dispatch = useDispatch();
  const handleAddToLibrary = () => {
    dispatch(addBookToLibrary(book._id));

    // Тут буде код для додавання книги до бібліотеки
    console.log(`Adding ${book.title} to library`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <img src={book.imageUrl} alt={book.title} width="150" />
        <p>Pages: {book.totalPages}</p>
        <button onClick={handleAddToLibrary}>Add to Library</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookModal;
