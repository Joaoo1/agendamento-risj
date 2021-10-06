import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import './styles.css';

const propTypes = {
  pages: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
};

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

Paginate.propTypes = propTypes;

export default Paginate;
