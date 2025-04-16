import { useLocation } from "react-router-dom";
import s from "./Dashboard.module.css";
import FiltersForm from "../Forms/FiltersForm";
import AppDescription from "../Details/AppDescription/AppDescription";
import Quote from "../Details/Quote/Quote";
import Details from "../Details/Details/Details";
import AddReadingForm from "../Forms/AddReadingForm";
import AddBookForm from "../Forms/AddBookForm";
import Recommended from "../Recommended/Recommended";
// import { useDispatch } from "react-redux";
// import { fetchBookDetails } from "../../redux/library/operations";

const Dashboard = ({ children, filters, onChange, onSubmit, book }) => {
  const { pathname } = useLocation();
  // const dispatch = useDispatch();
  return (
    <div className={s.dashboard}>
      {pathname === "/recommended" && (
        <div className={s.dashRecom}>
          <FiltersForm
            filters={filters}
            onChange={onChange}
            onSubmit={onSubmit}
          />
          <AppDescription />
          <Quote />
        </div>
      )}

      {pathname === "/library" && (
        <>
          Library
          <AddBookForm />
          <Recommended />
        </>
      )}

      {pathname === "/reading" && book && (
        <>
          Read
          <AddReadingForm
            bookId={book._id}
            totalPages={book.totalPages}
            updateStatus={(status) => {
              console.log("Book status:", status);
            }}
          />
          <Details book={book} />
        </>
      )}

      {children}
    </div>
  );
};
export default Dashboard;
