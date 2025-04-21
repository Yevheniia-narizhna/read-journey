import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookDetails,
  startReading,
  stopReading,
} from "../../redux/library/operations";
import { toast } from "react-toastify";
import { setIsReading } from "../../redux/library/slice";
import s from "./AddReadingForm.module.css";

const AddReadingForm = ({ bookId, totalPages, updateStatus }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("");

  const isReading = useSelector((state) => state.books.isReading);

  const handleStart = (e) => {
    e.preventDefault();
    // console.log("start");
    if (!page || page <= 0 || page > totalPages) {
      toast.error("Please enter a valid page number");
      return;
    }

    dispatch(startReading({ id: bookId, page }))
      .unwrap()
      .then(() => {
        toast.success("Reading started");

        dispatch(setIsReading(true));
        localStorage.setItem(`isReading_${bookId}`, "true");
      })
      .catch(() => toast.error());
  };

  const handleStop = (e) => {
    e.preventDefault();
    // console.log("stop");
    if (!page || page <= 0 || page > totalPages) {
      toast.error("Please enter a valid page number");
      return;
    }

    dispatch(stopReading({ id: bookId, page }))
      .unwrap()
      .then(() => {
        toast.success("Reading stopped");
        setIsReading(false);
        localStorage.setItem(`isReading_${bookId}`, "false");
        dispatch(fetchBookDetails(bookId));
        if (+page === totalPages) {
          console.log("You are on the last page!");
          updateStatus("done");
          // openSuccessModal();
        }
      })
      .catch(() => toast.error());
  };

  useEffect(() => {
    if (isReading) {
      // Якщо книга вже в процесі читання, встановлюємо значення сторінки
      setPage(""); // або остання сторінка
    }
  }, [isReading]);

  return (
    <div>
      <div className={s.readingFormCont}>
        <h4 className={s.title}> {isReading ? "Stop page:" : "Start page:"}</h4>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={s.inputBox}>
            <span className={s.textInput}>Page number:</span>
            <input
              type="number"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              placeholder="0"
              min="1"
              max={totalPages}
              required
              className={s.inputFirstForm}
            />
          </div>
          <button
            className={s.filterFormBtn}
            type="button"
            onClick={isReading ? handleStop : handleStart}
          >
            {isReading ? "To stop" : "To start"}
          </button>
        </form>
      </div>
      {/* {showSuccessModal && <ModalDone onClose={closeSuccessModal} />} */}
    </div>
  );
};
export default AddReadingForm;
