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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Book title"
        value={filters.title || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={filters.author || ""}
        onChange={handleChange}
      />
      <button type="submit">To apply</button>
    </form>
  );
};

export default FiltersForm;
