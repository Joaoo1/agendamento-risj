import LogoImg from '../../assets/images/logo.png';

import { Modal, ModalMain, Button, Header, Content, Title } from './styles';

const SuccessAppointmentModal = ({ show, handleClose, day, hour }) =>
  show ? (
    <Modal>
      <ModalMain>
        <Header>
          <img src={LogoImg} alt="Logo do Registro de Imóveis de São José" />
          <Title>Agendamento Realizado</Title>
        </Header>
        <Content>
          <p>{`Agendamento realizado com sucesso para o dia 
          ${day} às ${hour}. O cartório
           fica localizado na Avenida Leoberto Leal, n° 389 1º Andar, no bairro 
           Barreiros em São José. `}</p>
          <p>
            Em caso de retirada de documentos, é necessário trazer o recibo de
            antecipação na via original.
          </p>
          <p>
            Caso tenha dúvidas, envie um email para atendimento@risaojose.com.br
            ou ligue no (48) 3247-1677
          </p>
        </Content>
        <Button onClick={handleClose}>Fechar</Button>
      </ModalMain>
    </Modal>
  ) : (
    <></>
  );
export default SuccessAppointmentModal;
