import { TeamAction, TeamState } from "./types";

interface Props {
  onNext: () => void;
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

export default function CreateTeam1({ onNext, state, dispatch }: Props) {
  return <div></div>;
}
