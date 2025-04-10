import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedBooks } from "../../redux/library/operations";
import RecommendedBooks from "../RecommendedBooks/RecommendedBooks";
import FiltersForm from "../Forms/FiltersForm";

const RecommendedAll = () => {
  const dispatch = useDispatch();
  const { items, isLoading, error, totalPages, page } = useSelector(
    (state) => state.books
  );

  const [filters, setFilters] = useState({ title: "", author: "" });

  useEffect(() => {
    dispatch(
      getRecommendedBooks({
        title: filters.title,
        author: filters.author,
        page,
      })
    );
  }, [dispatch, filters, page]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecommendedBooks({ ...filters, page: 1 }));
  };

  return (
    <div>
      <h2>Recommended</h2>

      <FiltersForm
        filters={filters}
        onChange={handleFilterChange}
        onSubmit={handleSubmit}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <RecommendedBooks
        books={items}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) =>
          dispatch(getRecommendedBooks({ ...filters, page: newPage }))
        }
      />
    </div>
  );
};
export default RecommendedAll;
