import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserBook, getUserBooks } from "../../redux/library/operations";
// import { useNavigate } from "react-router-dom";
import LibraryBookModal from "../LibraryModal/LibraryModal";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks";
import { clearBooks } from "../../redux/library/slice";
import s from "./MyLibraryBooks.module.css";
import Select from "react-select";

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const { books = [], isLoading, error } = useSelector((state) => state.books);
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);

  useEffect(() => {
    dispatch(clearBooks());
    dispatch(getUserBooks());
  }, [dispatch]);

  useEffect(() => {
    const updateBooksPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBooksPerPage(2); // Мобільний
      } else if (width >= 768 && width < 1024) {
        setBooksPerPage(8); // Планшет
      } else {
        setBooksPerPage(10); // Десктоп
      }
    };

    // Визначаємо розмір при першому рендерингу
    updateBooksPerPage();

    // Додаємо прослуховування події зміни розміру вікна
    window.addEventListener("resize", updateBooksPerPage);

    // Очищаємо подію при відмонтованому компоненті
    return () => {
      window.removeEventListener("resize", updateBooksPerPage);
    };
  }, []);

  const handleDelete = (bookId) => {
    dispatch(deleteUserBook(bookId)).then(() => {
      // dispatch(getUserBooks());
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredBooks =
    filter === "all" ? books : books.filter((book) => book.status === filter);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const indexOfLastBook = page * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const options = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "in-progress", label: "In progress" },
    { value: "done", label: "Done" },
  ];

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      borderRadius: "8px", // округлені кути
      padding: "5px",
      border: "1px solid #3E3E3E", // колір обводки
    }),
    option: (styles, { isSelected, isFocused }) => ({
      ...styles,
      backgroundColor: isSelected ? "#262626" : isFocused ? "#262626" : null,
      color: "#333", // колір тексту в опціях
      padding: "10px", // відступи для опцій
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#333", // колір тексту вибраного значення
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#888", // колір тексту placeholder
    }),
  };
  console.log("items from store:", books);

  return (
    <div className={s.librBooksCont}>
      <div className={s.librTitleSel}>
        <h2>My library</h2>
        <Select
          value={options.find((option) => option.value === filter)} // встановлюємо вибір
          onChange={handleFilterChange} // обробка зміни фільтру
          options={options} // передаємо опції
          styles={customStyles} // додаємо власні стилі, якщо потрібно
        />
        {isLoading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {filteredBooks.length === 0 ? (
        <div className={s.imgBooksCont}>
          <div className={s.imgBooksBack}>
            <picture>
              <source
                srcSet="/src/img/books-small-x1.png 1x, /src/img/books-small-x2.png 2x"
                media="(max-width: 767px)"
              />
              <source
                srcSet="/src/img/books-big-x1.png 1x, /src/img/books-big-x2.png 2x"
                media="(min-width: 768px)"
              />
              <img src="/src/img/books-small-x1.png" alt="Books" />
            </picture>
          </div>
          <p className={s.text}>
            To start training, add <span>add some of your books</span> or from
            the recommended ones
          </p>
        </div>
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
