import styled from 'styled-components';

const BaseTable = styled.table`
  border-spacing: 0px 5px;

  thead {
    background-color: #a4a4a4;
  }

  tr {
    background-color: rgba(116, 121, 122, 0.15);
  }

  th,
  td {
    text-align: start;
    padding: 10px;
  }

  tr:first-child,
  th:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  tr:last-child,
  th:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export default BaseTable;
