import "./pagination.styles.css";

const Pagination = ({ currentPage, setCurrentPage, lastPage, indicesRef }) => {
  const buttonArray = [];
  for (let i = 1; i <= lastPage; i++) {
    buttonArray.push(i);
  }
  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 1 || lastPage < 1 ? "true" : false}
        onClick={() => {
          setCurrentPage(1);
          indicesRef.current.clear();
        }}
        className={`${currentPage === 1 ? "on-current-page" : "button-style"}`}
      >
        &lt;&lt;
      </button>
      <button
        disabled={currentPage === 1 || lastPage < 1 ? "true" : false}
        onClick={() => {
          setCurrentPage(currentPage - 1);
          indicesRef.current.clear();
        }}
        className={`${currentPage === 1 ? "on-current-page" : "button-style"}`}
      >
        &lt;
      </button>
      {buttonArray.map((pageNumber) => {
        return (
          <button
            key={pageNumber}
            onClick={() => {
              setCurrentPage(pageNumber);
              indicesRef.current.clear();
            }}
            className={`${
              pageNumber === currentPage ? "on-current-page" : "button-style"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={currentPage === lastPage || lastPage < 1 ? "true" : false}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          indicesRef.current.clear();
        }}
        className={`${
          currentPage === lastPage ? "on-current-page" : "button-style"
        }`}
      >
        &gt;
      </button>
      <button
        disabled={currentPage === lastPage || lastPage < 1 ? "true" : false}
        onClick={() => {
          setCurrentPage(lastPage);
          indicesRef.current.clear();
        }}
        className={`${
          currentPage === lastPage ? "on-current-page" : "button-style"
        }`}
      >
        &gt;&gt;
      </button>
    </div>
  );
};
export default Pagination;
