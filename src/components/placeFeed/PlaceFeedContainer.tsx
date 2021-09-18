import type { PlaceFeedData } from "../../lib/api/types";
import { SLink } from "../../styles";
import PlaceFeedRow from "./PlaceFeedRow";

interface Props {
  placeFeedDataArray?: PlaceFeedData[];
}

export default function PlaceFeedContainer({ placeFeedDataArray }: Props) {
  if (placeFeedDataArray?.length === 0)
    return <p>열려있는 식탁이 없어요 :( </p>;
  return (
    <>
      {placeFeedDataArray?.map((placeFeedData) => (
        <SLink
          key={placeFeedData.id}
          to={{
            pathname: `/place/${placeFeedData.id}`,
          }}
        >
          <PlaceFeedRow {...placeFeedData} />
        </SLink>
      ))}
    </>
  );
}
