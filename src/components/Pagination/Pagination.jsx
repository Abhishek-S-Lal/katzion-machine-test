// import clsx from "clsx";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import './Pagination.scss';

const Pagination = ({ itemsPerPage, totalItems, setPage, page }) => {

  let totalCount = Math.ceil(totalItems / itemsPerPage);

  const setSelectedPage = (result) => {
    let page = result.selected + 1;
    setPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (totalItems < 10) setPage(1);
  }, [totalItems, setPage]);
  return (
    <>
      {totalItems > itemsPerPage &&
        <ReactPaginate
          pageCount={totalCount}
          onPageChange={setSelectedPage}
          forcePage={page - 1}
          previousLabel={<div><i className="fa fa-arrow-left" aria-hidden="true" style={{ marginRight: "10px" }} />Previous</div>}
          nextLabel={<div>Next<i className="fa fa-arrow-right" aria-hidden="true" style={{ marginLeft: "10px" }} /></div>}
          breakLabel="..."
          breakClassName={"break-me"}
          breakLinkClassName={"page-link"}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          containerClassName={"pagination justify-content-center mt-4"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={`active page-${page}`}
          disabledClassName={"d-none"}
          renderOnZeroPageCount={null}
        />
      }
   
    </>
  );
};
export default Pagination;
