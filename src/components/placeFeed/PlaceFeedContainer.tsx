import { useHistory } from "react-router-dom";
import type { PlaceFeedData } from "../../lib/api/types";
import { Heading, SLink } from "../../styles";
import PlaceFeedRow from "./PlaceFeedRow";

interface Props {
  placeFeedDataArray?: PlaceFeedData[];
  hasError: boolean;
}

export default function PlaceFeedContainer({
  hasError,
  placeFeedDataArray,
}: Props) {
  const history = useHistory();
  if (hasError) return <Heading>에러가 발생했습니다.</Heading>;
  if (placeFeedDataArray?.length === 0)
    return <Heading>열려있는 식탁이 없어요 :( </Heading>;
  return (
    <>
      {placeFeedDataArray?.map((placeFeedData) => (
        <PlaceFeedRow
          key={placeFeedData.id}
          onClick={() =>
            history.push(
              `/place/${placeFeedData.id}?isFinal=${
                placeFeedData.deadline === "D-1"
              }&isClosed=${placeFeedData.isClosed}`
            )
          }
          {...placeFeedData}
        />
      ))}
    </>
  );
}
