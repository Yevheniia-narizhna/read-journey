import s from "./MyBook.module.css";

const MyBook = ({ book, isReading }) => {
  return (
    <div className={s.myBookCont}>
      <h2 className={s.myBookTitle}>My reading</h2>
      <div className={s.myBook}>
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
        <p>
          {isReading ? (
            <svg className={s.reading}>
              <use href="/symbol-defs.svg#icon-block" />
            </svg>
          ) : (
            <svg className={s.reading}>
              <use href="/symbol-defs.svg#icon-block-1" />
            </svg>
          )}
        </p>
      </div>
    </div>
  );
};

export default MyBook;
