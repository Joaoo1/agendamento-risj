import styled from 'styled-components';

const HolidayCard = styled.div`
  display: inline-block;
  background-color: #fff;
  width: 120px;
  cursor: pointer;
  margin: 10px;
  padding: 15px;
  border-radius: var(--default-border-radius);
  color: var(--primary-font-color);

  p {
    text-align: center;
  }

  :hover {
    opacity: 0.8;
    background-color: #a6a2a2;
  }
`;
const HolidayLoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export { HolidayCard, HolidayLoadingContainer };
