import { OpponentCircle } from '../OpponentCircle';

const OpponentCounter = ({ i, data }) => (
	<OpponentCircle
		userName={i.userName}
		count={data.filter(j => j.userName === i.userName).length}
	/>
);

export default OpponentCounter;
