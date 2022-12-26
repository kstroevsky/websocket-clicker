import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const GO_HOME_LABEL = <FontAwesomeIcon icon={faHouse}/>;
export const COPY_LABEL = <FontAwesomeIcon icon={faCopy}/>;
export const START_GAME_LABEL = <FontAwesomeIcon icon={faPlay}/>;
export const SOCKET_URL = 'http://localhost:4000';
export const FIRE_STYLE_CLASSNAME = 'font-effect-fire-animation';
export const GAME_PENDING_TIME = 600000;
