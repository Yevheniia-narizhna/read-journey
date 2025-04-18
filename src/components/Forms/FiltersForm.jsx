import s from "./FiltersForm.module.css";

const FiltersForm = ({
  filters = { title: "", author: "" },
  onChange,
  onSubmit,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className={s.filterFormCont}>
      <h4 className={s.filterFormTitle}>Filters:</h4>
      <form className={s.filterForm} onSubmit={onSubmit}>
        <div className={s.inputBox}>
          <span className={s.textInput}>Book title:</span>
          <input
            type="text"
            name="title"
            placeholder="Enter text"
            value={filters.title || ""}
            onChange={handleChange}
            className={s.inputFirstForm}
          />
        </div>
        <div className={s.inputBox}>
          <span className={s.textInput}>The author:</span>
          <input
            type="text"
            name="author"
            placeholder="Enter text"
            value={filters.author || ""}
            onChange={handleChange}
            className={s.inputSecForm}
          />
        </div>
        <button className={s.filterFormBtn} type="submit">
          To apply
        </button>
      </form>
    </div>
  );
};

export default FiltersForm;
