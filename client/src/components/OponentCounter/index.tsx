import {FC} from "react";
import {OpponentCounterPropsT} from "types/components";
import {OpponentCircle} from 'components/OpponentCircle';

const OpponentCounter: FC<OpponentCounterPropsT> = ({i, data}) => (
    <OpponentCircle
        userName={i.userName}
        count={data.filter(j => j.userName === i.userName).length}
    />
);

export default OpponentCounter;
