import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserBook, getUserBooks } from "../../redux/library/operations";
// import { useNavigate } from "react-router-dom";
import LibraryBookModal from "../LibraryModal/LibraryModal";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks";
import { clearBooks } from "../../redux/library/slice";
import s from "./MyLibraryBooks.module.css";
import Select from "react-select";

const getCustomStyles = (isTablet) => ({
  control: (base, state) => ({
    ...base,
    width: isTablet ? "153px" : "120px",
    fontSize: isTablet ? "14px" : "12px",
    minHeight: "40px",
    backgroundColor: "transparent",
    borderRadius: "12px",
    border: "1px solid #3E3E3E",
    boxShadow: "none",
    borderColor: state.isFocused ? "transparent" : "#3E3E3E",
    "&:hover": {
      borderColor: "#3E3E3E",
      cursor: "pointer",
    },
  }),
  menuList: (base) => ({
    ...base,
    padding: 0, // прибирає зайвий внутрішній відступ у списку
  }),

  valueContainer: (base) => ({
    ...base,
    height: "40px",
    padding: "0 8px",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "40px",
  }),
  option: (styles, { isSelected, isFocused }) => ({
    ...styles,
    backgroundColor: isSelected ? "#262626" : isFocused ? "#262626" : null,
    color: isSelected ? "#F9F9F9" : isFocused ? "#F9F9F9" : "#686868",
    cursor: "pointer",
    padding: "0px",
    fontSize: isTablet ? "14px" : "12px",
    paddingBottom: "7px", // внутрішній відступ
    margin: "0px",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#F9F9F9",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#262626",
    borderRadius: "14px",
    padding: "14px",
    width: isTablet ? "153px" : "120px",
    height: isTablet ? "126px" : "113px",
  }),
});

const MyLibraryBooks = () => {
  const dispatch = useDispatch();
  const { books = [], error } = useSelector((state) => state.books);
  const [filter, setFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );
  const [customStyles, setCustomStyles] = useState(getCustomStyles(isTablet));

  useEffect(() => {
    const handleResize = () => {
      const isTabletView = window.innerWidth >= 768;
      setIsTablet(isTabletView);
      setCustomStyles(getCustomStyles(isTabletView));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      dispatch(getUserBooks());
    });
  };

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption.value);
    console.log("Selected filter: ", selectedOption.value);
  };

  const filteredBooks =
    filter === "all" ? books : books.filter((book) => book.status === filter);

  useEffect(() => {
    console.log("Filtered books:", filteredBooks);
  }, [filteredBooks]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const indexOfLastBook = page * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const options = [
    { value: "all", label: "All books" },
    { value: "unread", label: "Unread" },
    { value: "in-progress", label: "In progress" },
    { value: "done", label: "Done" },
  ];

  console.log("items from store:", books);

  return (
    <div className={s.librBooksCont}>
      <div className={s.librTitleSel}>
        <h2 className={s.librTitle}>My library</h2>
        <Select
          value={options.find((option) => option.value === filter)}
          onChange={handleFilterChange}
          options={options}
          styles={customStyles}
        />
        {/* {isLoading && <p>Loading...</p>} */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {filteredBooks.length === 0 ? (
        <div className={s.imgBooksCont}>
          <div className={s.imgBooksBack}>
            <picture>
              <source
                srcSet="/img/books-small-x1.png 1x, /img/books-small-x2.png 2x"
                media="(max-width: 767px)"
              />
              <source
                srcSet="/img/books-big-x1.png 1x, /img/books-big-x2.png 2x"
                media="(min-width: 768px)"
              />
              <img src="/img/books-small-x1.png" alt="Books" />
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
