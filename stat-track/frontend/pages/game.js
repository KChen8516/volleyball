import { GameScreen } from "../components/Game";

// Grab the gameId from a next/query after creating the game
const GameDashboard = ({ query }) => (
  <GameScreen gameId={query.id} homeTeamId={query.homeTeamId} />
);

export default GameDashboard;
