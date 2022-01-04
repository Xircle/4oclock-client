import { useHistory } from "react-router-dom";
import type { PlaceFeedData, Review } from "../../lib/api/types";
import { colors, Heading } from "../../styles/styles";
import { LoaderWrapper } from "../shared/Loader";
import PlaceFeedRow from "./PlaceFeedRow";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";
import ReviewSmallContainer from "../review/ReviewSmallContainer";
import { Fragment } from "react";

interface Props {
  isAdminEditPlace?: boolean;
  placeFeedDataArray?: PlaceFeedData[];
  isLoading: boolean;
  hasError: boolean;
  reviews?: Review[];
}

export default function PlaceFeedContainer({
  isAdminEditPlace = false,
  isLoading,
  hasError,
  placeFeedDataArray,
  reviews,
}: Props) {
  const history = useHistory();
  if (hasError) return <SHeading>에러가 발생했습니다.</SHeading>;
  if (isLoading && (!placeFeedDataArray || placeFeedDataArray?.length === 0))
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

  if (!placeFeedDataArray || placeFeedDataArray?.length === 0)
    return <NothingHeading>열려있는 맛집이 없어요 :( </NothingHeading>;

  return (
    <>
      {placeFeedDataArray?.map((placeFeedData, idx) => (
        <Fragment key={placeFeedData.id}>
          <PlaceFeedRow
            onClick={() => {
              const {
                coverImage,
                name,
                participantsCount,
                views,
                startDateFromNow,
                isParticipating,
                startDateAt,
                participants,
              } = placeFeedData;
              if (!isAdminEditPlace) {
                history.push(
                  `/place/${placeFeedData.id}?isFinal=${
                    placeFeedData.deadline === "오늘 마감"
                  }&isClosed=${placeFeedData.isClosed}`,
                  {
                    coverImage,
                    name,
                    participants,
                    participantsCount,
                    views,
                    startDateFromNow,
                    isParticipating,
                    startDateAt,
                  },
                );
              } else {
                history.push(`/editPlace/${placeFeedData.id}`);
              }
            }}
            {...placeFeedData}
          />
          {idx === 2 && reviews && (
            <ReviewSmallContainer
              title={"이팅모임 사진들"}
              reviews={reviews}
            ></ReviewSmallContainer>
          )}
        </Fragment>
      ))}
    </>
  );
}

const SHeading = styled(Heading)`
  text-align: center;
`;
const NothingHeading = styled(Heading)`
  height: 100%;
  text-align: center;
  width: 200px;
  margin: 0 auto;
  padding-top: 100px;
  line-height: 40px;
`;
