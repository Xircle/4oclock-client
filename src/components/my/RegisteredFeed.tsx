import styled from "styled-components";
import { MyPlaceData } from "../../lib/api/types";
import { colors } from "../../styles";
import { PlaceFull, PlaceFullText } from "../placeFeed/PlaceFeedRow";

interface Props extends Omit<MyPlaceData, "id"> {}

export default function RegisteredFeed({
  isClosed,
  coverImage,
  name,
  tags,
  startDateFromNow,
  recommendation,
}: Props) {
  return (
    <FeedContainer>
      <FeedLeftContainer>
        {isClosed && (
          <>
            <PlaceFull />
            <PlaceFullText>마감 되었어요</PlaceFullText>
          </>
        )}
        <FeedImg src={coverImage} />
      </FeedLeftContainer>
      <FeedDescription>
        <FeedHeading>{name}</FeedHeading>
        <FeedDetailP>{tags}</FeedDetailP>

        <FeedTimeSpan>{"강남"}</FeedTimeSpan>
        <FeedTimeSpan style={{ marginRight: "3px", marginLeft: "3px" }}>
          /
        </FeedTimeSpan>
        <FeedTimeSpan>{startDateFromNow}</FeedTimeSpan>
        <FeedTimeSpan style={{ marginLeft: "8px" }}>
          {recommendation}
        </FeedTimeSpan>
      </FeedDescription>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const FeedLeftContainer = styled.div`
  width: 100px;
  height: 100px;
  padding: 0px;
  position: relative;
`;

const FeedImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const FeedDescription = styled.div`
  width: 200px;
  padding-left: 10px;
  padding-top: 5px;
`;

const FeedDetailP = styled.p`
  margin-top: 3px;
  font-size: 10px;
`;

const FeedTimeSpan = styled.span`
  margin-top: 3px;
  font-size: 10px;
  color: ${colors.LightGray};
`;

const FeedHeading = styled.h4`
  color: ${colors.StrongBlue};
  font-size: 15px;
  font-weight: 500;
`;
