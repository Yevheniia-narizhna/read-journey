import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserBook, getUserBooks } from "../../redux/library/operations";
// import { useNavigate } from "react-router-dom";
import LibraryBookModal from "../LibraryModal/LibraryModal";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const { items = [], isLoading, error } = useSelector((state) => state.books);
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  const handleDelete = (bookId) => {
    dispatch(deleteUserBook(bookId)).then(() => {
      dispatch(getUserBooks());
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredBooks =
    filter === "all" ? items : items.filter((book) => book.status === filter);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const indexOfLastBook = page * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = items.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(items.length / booksPerPage);

  // if (!isLoading && items.length === 0) {
  //   return (
  //     <div>
  //       <p>No books in your library.</p>
  //       <button>Add books</button>
  //     </div>
  //   );
  // }
  console.log("items from store:", items);

  return (
    <div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="unread">Unread</option>
        <option value="in-progress">In progress</option>
        <option value="finished">Finished</option>
      </select>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {filteredBooks.length === 0 ? (
        <p>No books in this category.</p>
      ) : (
        <RecommendedBooks
          books={currentBooks}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLibrary={true}
          onDelete={handleDelete}
          ModalComponent={LibraryBookModal}
        />
      )}
    </div>
  );
};

export default MyLibraryBooks;
