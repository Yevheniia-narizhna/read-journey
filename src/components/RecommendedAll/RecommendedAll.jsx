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

  const handleSubmit = (newPage) => {
    setPage(newPage);
    dispatch(getRecommendedBooks({ ...filters, page: newPage }));
  };

  useEffect(() => {
    if (!filters.title && !filters.author) {
      dispatch(getRecommendedBooks({ title: "", author: "", page }));
    }
  }, [dispatch, filters, page]);

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
