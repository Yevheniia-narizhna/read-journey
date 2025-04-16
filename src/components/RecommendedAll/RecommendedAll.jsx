import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedBooks } from "../../redux/library/operations";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks";
import s from "./RecommendedAll.module.css";

import Dashboard from "../Dashboard/Dashboard";

const RecommendedAll = () => {
  const dispatch = useDispatch();
  const { items, error, totalPages } = useSelector((state) => state.books);

  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({ title: "", author: "" });

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Запобігає перезавантаженню сторінки
    setPage(1); // Оновлюємо сторінку на першу після сабміту фільтра
    dispatch(getRecommendedBooks({ ...filters, page: 1 })); // Оновлюємо книги для першої сторінки
  };

  useEffect(() => {
    // Перевірка: якщо фільтри не вказано, відправляється запит на першу сторінку з порожніми фільтрами
    if (!filters.title && !filters.author) {
      dispatch(getRecommendedBooks({ title: "", author: "", page: 1 }));
    }
  }, [dispatch, filters]);

  // useEffect(() => {
  //   if (filters.title || filters.author) {
  //     dispatch(getRecommendedBooks({ ...filters, page }));
  //   } else {
  //     dispatch(getRecommendedBooks({ title: "", author: "", page }));
  //   }
  // }, [dispatch, filters, page]);

  return (
    <div className={s.recommAll}>
      <Dashboard
        filters={filters}
        onChange={handleFilterChange}
        onSubmit={handleSubmit}
      />

      {/* {isLoading && <p>Loading...</p>} */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {items && (
        <RecommendedBooks
          books={items}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            setPage(newPage);
            dispatch(getRecommendedBooks({ ...filters, page: newPage }));
          }}
        />
      )}
    </div>
  );
};
export default RecommendedAll;
