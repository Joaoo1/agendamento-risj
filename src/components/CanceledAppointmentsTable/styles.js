import styled from 'styled-components';

import BaseTable from '../../styles/table';

const Table = styled(BaseTable)`
  width: 100%;
`;

const ServicesList = styled.ul`
  list-style: none;

  li {
    margin-top: 4px;
  }
`;

export { Table, ServicesList };
