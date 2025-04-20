import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetails } from "../../redux/library/operations";
import Dashboard from "../Dashboard/Dashboard";
import MyBook from "../MyBook/MyBook";
import { setBookId } from "../../redux/library/slice";
import s from "./ReadingAll.module.css";

const ReadingAll = () => {
  const dispatch = useDispatch();
  const { book, isLoading, error } = useSelector((state) => state.books);
  const isReading = useSelector((state) => state.books.isReading);
  console.log("book", book);
  const bookId = useSelector((state) => state.books.id);

  useEffect(() => {
    const savedId = localStorage.getItem("currentBookId");
    if (savedId && !bookId) {
      dispatch(setBookId(savedId));
    }
  }, [dispatch, bookId]);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookDetails(bookId));
    }
  }, [dispatch, bookId]);
  console.log("bookId", bookId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!bookId) return <p>No book selected.</p>;
  if (!book) return null;
  return (
    <div className={s.readingAllCont}>
      <Dashboard book={book} />
      <MyBook book={book} isReading={isReading} />
    </div>
  );
};
export default ReadingAll;
