import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewBook } from "../../redux/library/operations";
import ModalSuccess from "../Modals/ModalSuccess";

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
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />
        {errors.author && <p style={{ color: "red" }}>{errors.author}</p>}

        <input
          name="totalPages"
          placeholder="number Of Pages"
          value={form.totalPages}
          onChange={handleChange}
        />
        {errors.totalPages && (
          <p style={{ color: "red" }}>{errors.totalPages}</p>
        )}

        <button type="submit">Add book</button>
      </form>

      {successModal && <ModalSuccess onClose={() => setSuccessModal(false)} />}
    </>
  );
};

export default AddBookForm;
