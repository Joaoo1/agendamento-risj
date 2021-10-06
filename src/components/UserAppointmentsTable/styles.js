import styled from 'styled-components';

import BaseTable from '../../styles/table';

const Table = styled(BaseTable)`
  width: 70%;
  margin: 30px 10px 30px 10px;

  @media (max-width: 840px) {
    width: 90%;
  }
`;

const CancelButton = styled.button`
  border: 1px solid #ff0000;
  border-radius: 25px;
  background-color: transparent;
  color: red;
  padding: 2px 10px 2px 10px;
  float: right;
  font-size: 13px;
`;

export { Table, CancelButton };
