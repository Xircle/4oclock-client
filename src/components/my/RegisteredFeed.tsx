import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { MyPlaceData } from "../../lib/api/types";
import { colors } from "../../styles/styles";
import { PlaceFull, PlaceFullText } from "../placeFeed/PlaceFeedRow";

interface Props extends MyPlaceData {}

export default function RegisteredFeed({
  id,
  isClosed,
  coverImage,
  name,
  startDateFromNow,
  oneLineIntroText,
  participantsCount,
}: Props) {
  const history = useHistory();
  return (
    <FeedContainer onClick={() => history.push(`/place/${id}?myPlace=true`)}>
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
        <div>
          <FeedHeading>{name}</FeedHeading>
          <FeedInfoP>
            {oneLineIntroText} <br />
            <b>
              {startDateFromNow} / {participantsCount}명의
            </b>{" "}
            친구들 신청중
          </FeedInfoP>
        </div>
        <CancelLink
          to={`place/${id}?showCancelBtn=true`}
          onClick={(e: any) => e.stopPropagation()}
        >
          <span>신청 취소하기</span>
        </CancelLink>
      </FeedDescription>
    </FeedContainer>
  );
}

const CancelLink = styled(Link)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  span {
    color: #fff;
    font-size: 10px;
    font-weight: 500;
    line-height: 13px;
    padding: 5px;
    background-color: #c4cbd8;
    border-radius: 3px;
  }
`;

const FeedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 18px 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const FeedLeftContainer = styled.div`
  width: 120px;
  height: 120px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 205px;
  padding-left: 16px;
  padding-top: 5px;
  padding-bottom: 7px;
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

const FeedInfoP = styled.p`
  margin-top: 5px;
  font-size: 10.5px;
  color: ${colors.MidGray};
  font-weight: normal;
  line-height: 17px;
  b {
    font-weight: normal;
    color: ${colors.Black};
  }
`;

const FeedHeading = styled.h4`
  color: ${colors.StrongBlue};
  font-size: 15px;
  font-weight: 500;
`;
