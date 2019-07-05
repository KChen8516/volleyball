import { PlayerProfile } from "../components/PlayerProfile";

// gets props from next/link
const SinglePlayer = (props) => <PlayerProfile id={props.query.id} />;
export default SinglePlayer;
