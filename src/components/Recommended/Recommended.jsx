import { useDispatch, useSelector } from "react-redux";
import s from "./Recommended.module.css";
import { useEffect, useState } from "react";
import { getRecommendedBooks } from "../../redux/library/operations";
import { Link } from "react-router-dom";
import BookModal from "../BookModal/BookModal";

const Recommended = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.books);
  const [randomBooks, setRandomBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(getRecommendedBooks({ title: "", author: "", page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (items.length > 0) {
      // Вибираємо 3 випадкові книги
      const randomBooks = getRandomBooks(items, 3);
      setRandomBooks(randomBooks);
    }
  }, [items]);

  // Функція для вибору випадкових книг
  const getRandomBooks = (books, num) => {
    const shuffled = [...books].sort(() => 0.5 - Math.random()); // Перемішуємо масив
    return shuffled.slice(0, num); // Повертаємо перші num книг після перемішування
  };

  const handleBookClick = (book) => {
    setSelectedBook(book); // Встановлюємо вибрану книгу
  };

  const closeModal = () => {
    setSelectedBook(null); // Закриваємо модалку
  };

  return (
    <div className={s.contRecomSmall}>
      <h3>Recommended books</h3>
      <ul className={s.booksList}>
        {randomBooks.length > 0 ? (
          randomBooks.map((book) => (
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
              <h3 className={`${s.truncate} ${s.title}`}>{book.title}</h3>
              <p className={`${s.truncate} ${s.author}`}>{book.author}</p>
            </li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>
      {selectedBook && <BookModal book={selectedBook} onClose={closeModal} />}
      <div className={s.links}>
        <Link to="/recommended" replace>
          Home
        </Link>
        <Link to="/recommended" replace className={s.link}>
          <svg className={s.arrow}>
            <use href="/symbol-defs.svg#icon-log-in" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Recommended;
