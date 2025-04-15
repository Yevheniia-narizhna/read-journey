import { useLocation } from "react-router-dom";
import s from "./Dashboard.module.css";
import FiltersForm from "../Forms/FiltersForm";
import AppDescription from "../Details/AppDescription/AppDescription";
import Quote from "../Details/Quote/Quote";
import Details from "../Details/Details/Details";

const Dashboard = ({ children, filters, onChange, onSubmit, book }) => {
  const { pathname } = useLocation();
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
          {/* <AddBookForm />
          <Recommended /> */}
        </>
      )}

      {pathname === "/reading" && book && (
        <>
          Read
          {/* <AddReadingForm /> */}
          <Details book={book} />
        </>
      )}

      {children}
    </div>
  );
};
export default Dashboard;
