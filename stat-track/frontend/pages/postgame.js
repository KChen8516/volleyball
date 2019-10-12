import { PostGame } from "../components/PostGame";

// Grab the gameId from a next/query after saving the game
const PostGameScreen = ({ query }) => <PostGame gameId={query.id} />;

export default PostGameScreen;
