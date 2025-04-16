import { useState } from "react";

import s from "./RecommendedBooks.module.css";
import BookModal from "../BookModal/BookModal";

const RecommendedBooks = ({
  books,
  currentPage,
  totalPages,
  onPageChange,
  isLibrary,
  onDelete,
  ModalComponent,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const Modal = ModalComponent || BookModal;
  console.log("books:", books);

  return (
    <div>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className={s.booksList}>
          {books.map((book) => (
            <div
              key={book._id}
              className={s.bookCard}
              onClick={() => handleBookClick(book)}
            >
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
              {isLibrary && onDelete && (
                <button onClick={() => onDelete(book._id)}>
                  <img
                    src="/src/img/block.png"
                    alt="Delete"
                    width="28"
                    height="28"
                  />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedBook && <Modal book={selectedBook} onClose={closeModal} />}

      <div className={s.pagination}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &#8592; Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
};

export default RecommendedBooks;
