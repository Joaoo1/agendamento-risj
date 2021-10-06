import ReactLoading from 'react-loading';

import { ScheduleCard, ScheduleLoadingContainer } from './styles';

const ScheduleList = ({ schedule, onCardClick, isLoading }) => {
  if (isLoading) {
    return (
      <ScheduleLoadingContainer>
        <ReactLoading type="spin" color="#403e3e" height={100} width={50} />
      </ScheduleLoadingContainer>
    );
  }

  if (schedule.length === 0) {
    return <p>Nenhum horário disponível foi encontrado</p>;
  }

  return schedule.map(s => (
    <ScheduleCard key={s.id} onClick={() => onCardClick(s)}>
      <p>{s.schedule}</p>
    </ScheduleCard>
  ));
};

export default ScheduleList;
