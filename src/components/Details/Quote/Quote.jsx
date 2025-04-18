import s from "./Quote.module.css";
const Quote = () => {
  return (
    <div className={s.quoteCont}>
      <div className={s.quoteImg}>
        <picture>
          <source
            srcSet="/src/img/books-small-x1.png 1x, /src/img/books-small-x2.png 2x"
            media="(max-width: 767px)"
          />
          <source
            srcSet="/src/img/books-big-x1.png 1x, /src/img/books-big-x2.png 2x"
            media="(min-width: 768px)"
          />
          <img src="/src/img/books-small-x1.png" alt="Recommended Book" />
        </picture>
      </div>
      <div>
        <p className={s.quoteText}>
          "Books are <span>windows</span> to the world, and reading is a journey
          into the unknown."
        </p>
      </div>
    </div>
  );
};
export default Quote;
