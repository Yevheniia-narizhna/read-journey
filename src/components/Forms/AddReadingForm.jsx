import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookDetails,
  startReading,
  stopReading,
} from "../../redux/library/operations";
import { toast } from "react-toastify";
import { setIsReading } from "../../redux/library/slice";

const AddReadingForm = ({ bookId, totalPages, updateStatus }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("");
  const isReading = useSelector((state) => state.books.isReading);

  const handleStart = (e) => {
    e.preventDefault();
    if (!page || page <= 0 || page > totalPages) {
      toast.error("Please enter a valid page number");
      return;
    }

    dispatch(startReading({ id: bookId, page }))
      .unwrap()
      .then(() => {
        toast.success("Reading started");
        // updateStatus("reading"); // Змінити статус книги
        dispatch(setIsReading(true));
      })
      .catch(() => toast.error());
  };

  const handleStop = (e) => {
    e.preventDefault();
    if (!page || page <= 0 || page > totalPages) {
      toast.error("Please enter a valid page number");
      return;
    }

    dispatch(stopReading({ id: bookId, page }))
      .unwrap()
      .then(() => {
        toast.success("Reading stopped");
        setIsReading(false);

        dispatch(fetchBookDetails(bookId));

        if (+page === totalPages) {
          updateStatus("completed");
          openSuccessModal();
        }
      })
      .catch(() => toast.error());
  };

  const openSuccessModal = () => {
    // Логіка відкриття модалки для успішного завершення книги
    console.log("Book finished!");
  };

  useEffect(() => {
    if (isReading) {
      // Якщо книга вже в процесі читання, встановлюємо значення сторінки
      setPage(""); // або остання сторінка
    }
  }, [isReading]);

  return (
    <form>
      <input
        type="number"
        value={page}
        onChange={(e) => setPage(e.target.value)}
        placeholder="Enter page"
        min="1"
        max={totalPages}
        required
      />
      <button type="submit" onClick={isReading ? handleStop : handleStart}>
        {isReading ? "To stop" : "To start"}
      </button>
    </form>
  );
};
export default AddReadingForm;
