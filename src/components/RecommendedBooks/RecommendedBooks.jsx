import { useEffect, useState } from "react";

import s from "./RecommendedBooks.module.css";
import BookModal from "../BookModal/BookModal";
import { useDispatch } from "react-redux";
import { getRecommendedBooks } from "../../redux/library/operations";
import { useLocation } from "react-router-dom";

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
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [booksPerPage, setBooksPerPage] = useState(2);
  useEffect(() => {
    const updateBooksPerPage = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setBooksPerPage(2); // Мобільний
      } else if (width >= 768 && width < 1440) {
        setBooksPerPage(8); // Планшет
      } else {
        setBooksPerPage(10); // Десктоп
      }
    };

    updateBooksPerPage(); // Викликаємо функцію на початку

    // Додаємо слухача для зміни ширини екрану
    window.addEventListener("resize", updateBooksPerPage);

    return () => window.removeEventListener("resize", updateBooksPerPage); // Очищаємо слухач
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
    if (pathname === "/recommended") {
      dispatch(
        getRecommendedBooks({ title: "", author: "", page: currentPage })
      );
    }
  };

  const Modal = ModalComponent || BookModal;
  console.log("books:", books);

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = currentPage * booksPerPage;

  const paginatedBooks = books.slice(startIndex, endIndex);

  return (
    <div className={s.booklistCont}>
      {paginatedBooks.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul className={s.booksList}>
          {paginatedBooks.map((book) => (
            <li
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
                <button
                  className={s.deleteBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(book._id);
                  }}
                >
                  <img
                    src="/src/img/block.png"
                    alt="Delete"
                    width="28"
                    height="28"
                  />
                </button>
              )}
            </li>
          ))}
        </ul>
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
