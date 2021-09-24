import { useHistory } from "react-router-dom";
import routes from "../routes";
import { Heading } from "../styles/styles";

export default function NotFoundPage() {
  const history = useHistory();
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Heading>Not found</Heading>
      <button onClick={() => history.push(routes.placeFeed)}>
        홈으로 가기
      </button>
    </div>
  );
}
