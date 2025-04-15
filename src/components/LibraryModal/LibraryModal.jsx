import { useNavigate } from "react-router-dom";

const LibraryModal = ({ book, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        <h2>{book.title}</h2>
        <p>{book.author}</p>
        <img src={book.imageUrl} alt={book.title} width="150" />
        <p>Pages: {book.totalPages}</p>
        <button onClick={() => navigate("/reading")}>Start reading</button>
      </div>
    </div>
  );
};

export default LibraryModal;
