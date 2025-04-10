import { useLocation } from "react-router-dom";
import s from "./Dashboard.module.css";

const Dashboard = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className={s.dashboard}>
      <div>Dashboard</div>
      {pathname === "/recommended" && (
        <>
          Recomm
          {/* <FiltersForm />
          <AppDescription />
          <Quote /> */}
        </>
      )}

      {pathname === "/library" && (
        <>
          Library
          {/* <AddBookForm />
          <Recommended /> */}
        </>
      )}

      {pathname === "/reading" && (
        <>
          Read
          {/* <AddReadingForm />
          <Details /> */}
        </>
      )}

      {children}
    </div>
  );
};
export default Dashboard;
