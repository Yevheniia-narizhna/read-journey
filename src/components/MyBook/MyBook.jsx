import s from "./MyBook.module.css";

const MyBook = ({ book, isReading }) => {
  return (
    <div>
      <img src={book.imageUrl} alt={book.title} width="100" />
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Pages: {book.totalPages}</p>
      <p>
        {isReading ? (
          <svg className={s.reading}>
            <use href="/src/assets/symbol-defs.svg#icon-block" />
          </svg>
        ) : (
          <svg className={s.reading}>
            <use href="/src/assets/symbol-defs.svg#icon-block-1" />
          </svg>
        )}
      </p>
    </div>
  );
};

export default MyBook;
