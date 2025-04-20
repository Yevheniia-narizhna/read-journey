import { useDispatch } from "react-redux";
import {
  deleteReading,
  fetchBookDetails,
} from "../../../redux/library/operations";
import { toast } from "react-toastify";
import s from "./Diary.module.css";

const Diary = ({ entries, bookId, totalPages }) => {
  const dispatch = useDispatch();

  const handleDelete = (entryId) => {
    dispatch(deleteReading({ bookId, entryId }))
      .unwrap()
      .then(() => {
        toast.success("Event deleted");
        dispatch(fetchBookDetails(bookId));
      })
      .catch((err) => toast.error(err.message));
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  return (
    <div className={s.diaryCont}>
      <ul className={s.wrapper}>
        {entries.map((entry, index) => {
          const pagesRead = entry.finishPage - entry.startPage;

          const percentageRead = ((pagesRead / totalPages) * 100).toFixed(2);

          const timeRead = `${Math.round(entry.speed / 60)} pages/hour`;

          return (
            <li key={entry._id} className={s.row}>
              <div className={s.data}>
                <p>{formatDate(entry.startReading)} </p>

                <p> {pagesRead} pages</p>
                <p> {percentageRead}%</p>

                <p>
                  {Math.round(
                    (new Date(entry.finishReading) -
                      new Date(entry.startReading)) /
                      60000
                  )}
                </p>
                <img src="/src/img/block-green.png" />
                <p> {timeRead} </p>
              </div>
              <div className={s.line}>
                <span className={s.dot}>
                  {index === 0 ? (
                    <img className={s.svgIcon} src="/src/img/frame-56.png" />
                  ) : (
                    <svg className={s.svgIcon}>
                      <use href="/src/assets/symbol-defs.svg#icon-frame-56" />
                    </svg>
                  )}
                </span>
              </div>

              <button onClick={() => handleDelete(entry._id)}>
                <img src="/src/img/trash-2.png" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Diary;
