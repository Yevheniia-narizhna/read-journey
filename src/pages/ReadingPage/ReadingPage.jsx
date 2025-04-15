import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/Dashboard/Dashboard";
import MyBook from "../../components/MyBook/MyBook";
import { useEffect } from "react";
import { fetchBookDetails } from "../../redux/library/operations";

const ReadingPage = () => {
  const dispatch = useDispatch();
  const { book, isLoading, error } = useSelector((state) => state.books);
  const bookId = useSelector((state) => state.books.bookId);
  useEffect(() => {
    if (bookId) {
      dispatch(fetchBookDetails(bookId));
    }
  }, [dispatch, bookId]);

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
export default ReadingPage;
