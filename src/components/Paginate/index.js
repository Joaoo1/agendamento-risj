import ReactPaginate from 'react-paginate';
import './styles.css';

const Paginate = ({ pages, onPageClick }) => (
  <ReactPaginate
    pageCount={pages}
    pageRangeDisplayed={5}
    previousLabel="<"
    nextLabel=">"
    initialPage={0}
    onPageChange={({ selected }) => onPageClick(selected + 1)}
    containerClassName="container"
    previousClassName="button"
    nextClassName="button"
    activeLinkClassName="active"
  />
);

export default Paginate;
