import ReactLoading from 'react-loading';

import { LoadingContainer } from './styles';

const LoadingIndicator = () => (
  <LoadingContainer>
    <ReactLoading
      type="spinningBubbles"
      height={250}
      width={125}
      color="#403e3e"
    />
  </LoadingContainer>
);
export default LoadingIndicator;
