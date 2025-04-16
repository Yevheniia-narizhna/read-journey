import { useDispatch } from "react-redux";
import {
  deleteReading,
  fetchBookDetails,
} from "../../../redux/library/operations";
import { toast } from "react-toastify";

const Diary = ({ entries, bookId }) => {
  const dispatch = useDispatch();

  // Обробник для видалення події читання
  const handleDelete = (entryId) => {
    dispatch(deleteReading({ bookId, entryId }))
      .unwrap()
      .then(() => {
        toast.success("Event deleted");
        dispatch(fetchBookDetails(bookId)); // оновлення книги
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry._id}>
          <p>
            {entry.startReading}: {entry.finishPage - entry.startPage} pages,
            Speed: {entry.speed} pages/min
          </p>
          <button onClick={() => handleDelete(entry._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Diary;
