import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookToLibrary, getUserBooks } from "../../redux/library/operations";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, totalPages, page } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(getUserBooks({ page }));
  }, [dispatch, page]);

  const handleAddBook = (bookId) => {
    dispatch(addBookToLibrary(bookId));
  };

  const handlePageChange = (newPage) => {
    dispatch(getUserBooks({ page: newPage }));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {items.map((book) => (
          <div key={book._id}>
            <img src={book.imageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button onClick={() => handleAddBook(book._id)}>
              Add to Library
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyLibraryBooks;
