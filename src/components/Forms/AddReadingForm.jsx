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
import ModalDone from "../ModalDone/ModalDone";

const AddReadingForm = ({ bookId, totalPages, updateStatus }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState("");
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
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
    console.log("Page:", page); // Додайте цей лог для перевірки значення
    console.log("Total Pages:", totalPages);
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
        console.log("Type of Page:", typeof page);
        console.log("Type of Total Pages:", typeof totalPages);
        console.log("Checking if last page: ", page, " === ", totalPages);
        if (+page === totalPages) {
          console.log("You are on the last page!");
          updateStatus("done");
          // openSuccessModal();
        }
      })
      .catch(() => toast.error());
  };

  // const openSuccessModal = () => {
  //   console.log("Opening success modal...");
  //   setShowSuccessModal(true);
  //   console.log("Book finished!");
  // };
  // const closeSuccessModal = () => {
  //   setShowSuccessModal(false);
  //   dispatch(fetchBookDetails(bookId)); // тепер тут — після закриття
  // };
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
        <form>
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
            type="submit"
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
