const MyBook = ({ book }) => {
  return (
    <div>
      <div>
        <img src={book.imageUrl} alt={book.title} width="100" />
        <h2>{book.title}</h2>
        <p>Author: {book.author}</p>
        <p>Pages: {book.totalPages}</p>
      </div>
    </div>
  );
};
export default MyBook;
