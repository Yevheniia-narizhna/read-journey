import Dashboard from "../../components/Dashboard/Dashboard";
import MyLibraryBooks from "../../components/MyLibraryBooks/MyLibraryBooks";
import s from "./LibraryPage.module.css";

const LibraryPage = () => {
  return (
    <div className={s.libraryPage}>
      <Dashboard />
      <MyLibraryBooks />
    </div>
  );
};
export default LibraryPage;
