import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

import { HolidayCard, HolidayLoadingContainer } from './styles';

const propTypes = {
  holidays: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCardClick: PropTypes.func.isRequired,
};

const HolidayList = ({ isLoading, holidays, onCardClick }) => {
  function renderList() {
    if (isLoading) {
      return (
        <HolidayLoadingContainer>
          <ReactLoading type="spin" color="#403e3e" height={100} width={50} />
        </HolidayLoadingContainer>
      );
    }

    if (holidays.length === 0) {
      return <p>Nenhum feriado foi encontrado</p>;
    }

    return holidays.map(holiday => (
      <HolidayCard key={holiday.id} onClick={() => onCardClick(holiday)}>
        <p>{holiday.date}</p>
      </HolidayCard>
    ));
  }

  return <div>{renderList()}</div>;
};

HolidayList.propTypes = propTypes;

export default HolidayList;
