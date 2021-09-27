import { useHistory } from "react-router-dom";
import type { PlaceFeedData } from "../../lib/api/types";
import {
  colors,
  ContainerFlexColumn,
  Heading,
  SLink,
} from "../../styles/styles";
import { LoaderBackdrop, LoaderWrapper } from "../shared/Loader";
import PlaceFeedRow from "./PlaceFeedRow";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

interface Props {
  placeFeedDataArray?: PlaceFeedData[];
  isLoading: boolean;
  hasError: boolean;
}

export default function PlaceFeedContainer({
  isLoading,
  hasError,
  placeFeedDataArray,
}: Props) {
  const history = useHistory();
  if (hasError) return <Heading>에러가 발생했습니다.</Heading>;
  if (isLoading)
    return (
      <>
        <LoaderWrapper top={"40%"}>
          <ClipLoader
            loading={isLoading}
            color={colors.MidBlue}
            css={{
              name: "width",
              styles: "border-width: 4px; z-index: 999;",
            }}
            size={30}
          />
        </LoaderWrapper>
      </>
    );

  if (placeFeedDataArray?.length === 0)
    return <NothingHeading>열려있는 식탁이 없어요 :( </NothingHeading>;

  return (
    <>
      {placeFeedDataArray?.map((placeFeedData) => (
        <PlaceFeedRow
          key={placeFeedData.id}
          onClick={() =>
            history.push(
              `/place/${placeFeedData.id}?isFinal=${
                placeFeedData.deadline === "오늘 마감"
              }&isClosed=${placeFeedData.isClosed}`
            )
          }
          {...placeFeedData}
        />
      ))}
    </>
  );
}

const NothingHeading = styled(Heading)`
  height: 100%;
  text-align: center;
  width: 200px;
  margin: 0 auto;
  padding-top: 100px;
  line-height: 40px;
`;
