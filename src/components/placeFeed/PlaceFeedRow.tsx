import styled from "styled-components";
import { colors, FlexDiv } from "../../styles/styles";
import type { PlaceFeedData } from "../../lib/api/types";
import Avatar from "../shared/Avatar";
import { ModifyDeadline } from "../../lib/utils";
import { TimeNumberToString } from "../../lib/utils";

interface Props extends PlaceFeedData {
  onClick: () => void;
}

export default function PlaceFeedRow({
  onClick,
  name,
  coverImage,
  deadline,
  oneLineIntroText,
  isClosed,
  isLightning,
  participantsCount,
  startDateFromNow,
  startTime,
  participants,
  isParticipating,
  views,
}: Props) {
  return (
    <Container onClick={onClick}>
      <PlaceLeftContainer>
        {isClosed && (
          <>
            <PlaceFull />
            <PlaceFullText>마감 되었어요</PlaceFullText>
          </>
        )}
        {deadline && (
          <PlaceDeadline isLightning={isLightning}>
            <p>{ModifyDeadline(deadline)}</p>
          </PlaceDeadline>
        )}
        <PlaceCoverImage src={coverImage} isLightning={isLightning} />
      </PlaceLeftContainer>

      <PlaceRightContainer>
        <FlexSpaceBetween>
          <PlaceName>{name}</PlaceName>
          <ViewCount>
            <img src="/icons/eye.svg" />
            {views}
          </ViewCount>
        </FlexSpaceBetween>
        <PlaceOneLineIntroText>{oneLineIntroText}</PlaceOneLineIntroText>
        <PlaceSummary>
          {startDateFromNow} {!isClosed && TimeNumberToString(startTime)} /{" "}
          {participantsCount}명의
          <span className="bold"> 친구들 신청중</span>
        </PlaceSummary>
        {!isClosed && (
          <ParticipantsContainer>
            <ParticipantsWrapper isParticipating={isParticipating}>
              {participants.map((parti, idx) => {
                if (idx < 4) {
                  return (
                    <Avatar
                      key={parti.userId}
                      rightOffset={"-10px"}
                      {...parti}
                    />
                  );
                }
              })}
            </ParticipantsWrapper>
            {participantsCount > 4 ? <p>+{participantsCount - 4}</p> : null}
          </ParticipantsContainer>
        )}
      </PlaceRightContainer>
    </Container>
  );
}

const FlexSpaceBetween = styled(FlexDiv)`
  justify-content: space-between;
`;

const ViewCount = styled.span`
  color: #a7b0c0;
  font-size: 9px;
  img {
    margin-right: 5px;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 18px 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
const PlaceLeftContainer = styled.div`
  width: 120px;
  height: 120px;
  padding: 0px;
  position: relative;
`;
const PlaceCoverImage = styled.img<{ isLightning: boolean }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #e11382, #ffdc24) border-box;
  border: ${(props) => props.isLightning && "3px solid transparent"};
  border-radius: 5px;
  display: inline-block;
`;

const PlaceRightContainer = styled.div`
  width: 205px;
  padding-left: 10px;
  padding-top: 5px;
`;

const PlaceDeadline = styled.div<{ isLightning: boolean }>`
  position: absolute;
  background-color: ${(props) => (props.isLightning ? "#000" : colors.MidBlue)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 52px;
  height: 21px;
  top: -10px;
  left: 5px;
  p {
    color: white;
    font-weight: 700;
    font-size: 11px;
  }
`;

export const PlaceFull = styled.div`
  position: absolute;
  background-color: ${colors.Black};
  width: 100%;
  height: 100%;
  opacity: 0.5;
  border-radius: 5px;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const PlaceSummary = styled.p`
  font-weight: 500;
  font-size: 10.5px;
  line-height: 13px;
  color: #12121d;
  .bold {
    color: #8c94a4;
  }
`;

export const PlaceFullText = styled.div`
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ParticipantsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 17px;
  p {
    font-size: 14px;
    font-weight: bold;
    color: ${colors.MidGray};
    margin-left: 17px;
  }
`;

const ParticipantsWrapper = styled.div<{ isParticipating: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  filter: ${(props) => !props.isParticipating && "blur(1px)"};
`;

const PlaceTags = styled.p`
  margin-top: 5px;
  font-size: 10px;
  color: ${colors.MidGray};
`;

const PlaceOneLineIntroText = styled.p`
  margin: 8px 0 6px;
  font-size: 10.5px;
  color: #8c94a4;
`;

const PlaceName = styled.span`
  color: #1c43b7;
  font-size: 15px;
  font-weight: 500;
`;
