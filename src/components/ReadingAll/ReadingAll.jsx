import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetails } from "../../redux/library/operations";
import Dashboard from "../Dashboard/Dashboard";
import MyBook from "../MyBook/MyBook";

const ReadingAll = () => {
  const dispatch = useDispatch();
  const { book, isLoading, error } = useSelector((state) => state.books);
  console.log("book", book);
  const bookId = useSelector((state) => state.books.id);
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
    <div>
      <Dashboard book={book} />
      <MyBook book={book} />
    </div>
  );
};
export default ReadingAll;
