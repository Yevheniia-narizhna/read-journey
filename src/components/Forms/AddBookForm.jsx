import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewBook } from "../../redux/library/operations";
import ModalSuccess from "../Modals/ModalSuccess";
import s from "./AddBookForm.module.css";

const AddBookForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", author: "", totalPages: "" });
  const [errors, setErrors] = useState({});
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = ({ title, author, totalPages }) => {
    const errors = {};

    if (!title.trim()) errors.title = "Title is required";
    if (!author.trim()) errors.author = "Author is required";
    if (!totalPages || isNaN(totalPages) || totalPages <= 0)
      errors.totalPages = "Total pages must be a positive number";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return;
    }

    try {
      const result = await dispatch(addNewBook(form)).unwrap();
      if (result) {
        setSuccessModal(true);
        setForm({ title: "", author: "", totalPages: "" });
        setErrors({});
      }
    } catch (error) {
      dispatch(error);
    }
  };

  return (
    <div className={s.filterFormCont}>
      <h4 className={s.filterFormTitle}>Create your library:</h4>
      <form className={s.filterForm} onSubmit={handleSubmit}>
        <div className={s.inputBox}>
          <span className={s.textInput}>Book title:</span>
          <input
            name="title"
            placeholder="Enter text"
            value={form.title}
            onChange={handleChange}
            className={s.inputFirstForm}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>
        <div className={s.inputBox}>
          <span className={s.textInput}>The author:</span>
          <input
            name="author"
            placeholder="Enter text"
            value={form.author}
            onChange={handleChange}
            className={s.inputSecForm}
          />
          {errors.author && <p style={{ color: "red" }}>{errors.author}</p>}
        </div>
        <div className={s.inputBox}>
          <span className={s.textInput}>Number of pages:</span>
          <input
            name="totalPages"
            placeholder="0"
            value={form.totalPages}
            onChange={handleChange}
            className={s.inputThForm}
          />
          {errors.totalPages && (
            <p style={{ color: "red" }}>{errors.totalPages}</p>
          )}
        </div>
        <button className={s.filterAddFormBtn} type="submit">
          Add book
        </button>
      </form>

      {successModal && <ModalSuccess onClose={() => setSuccessModal(false)} />}
    </div>
  );
};

export default AddBookForm;
