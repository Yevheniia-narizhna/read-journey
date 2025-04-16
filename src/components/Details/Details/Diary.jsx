import { useDispatch } from "react-redux";
import {
  deleteReading,
  fetchBookDetails,
} from "../../../redux/library/operations";
import { toast } from "react-toastify";

const Diary = ({ entries, bookId, totalPages }) => {
  const dispatch = useDispatch();
  // const percentageRead = (currentPage / totalPages) * 100;
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

  // Функція для форматування дати без часу
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };
  // const minutes = Math.round(
  //   (new Date(entry.finishReading) - new Date(entry.startReading)) / 60000
  // );
  return (
    <ul>
      {entries.map((entry) => {
        // Розраховуємо кількість прочитаних сторінок
        const pagesRead = entry.finishPage - entry.startPage;
        // Розраховуємо відсоток прочитаних сторінок
        const percentageRead = ((pagesRead / totalPages) * 100).toFixed(2);
        // Час прочитання (за умовчанням, можна додати час початку/закінчення)
        const timeRead = `${Math.round(entry.speed / 60)} pages/hour`;

        return (
          <li key={entry._id}>
            <p>{formatDate(entry.startReading)} </p>

            <p> {pagesRead} pages</p>
            <p> {percentageRead}%</p>

            {/* <p>{minutes}</p> */}
            <p>
              {Math.round(
                (new Date(entry.finishReading) - new Date(entry.startReading)) /
                  60000
              )}
            </p>
            <img src="/src/img/block-green.png" />
            <p> {timeRead} </p>
            <button onClick={() => handleDelete(entry._id)}>
              <img src="/src/img/trash-2.png" />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Diary;
