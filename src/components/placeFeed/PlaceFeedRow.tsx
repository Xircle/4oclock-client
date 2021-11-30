import styled from "styled-components";
import { colors, FlexDiv } from "../../styles/styles";
import type { PlaceFeedData } from "../../lib/api/types";
import Avatar from "../shared/Avatar";
import { getStartDateFromNow, ModifyDeadline } from "../../lib/utils";
import optimizeImage from "../../lib/optimizeImage";
import { useEffect, useState } from "react";
import moment from "moment";

interface Props extends PlaceFeedData {
  onClick: () => void;
}

export default function PlaceFeedRow({
  onClick,
  name,
  coverImage,
  deadline,
  isClosed,
  leftParticipantsCount,
  startDateFromNow,
  startDateAt,
  placeDetail,
  views,
}: Props) {
  const [countDownCaption, setCountDownCaption] = useState<
    string | undefined
  >();

  const isTodayPlace = (startDateAt: string) => {
    if (moment(startDateAt).diff(moment(), "days") === 0) return true;
    return false;
  };

  useEffect(() => {
    if (isClosed || !isTodayPlace(startDateAt)) return;
    const deadlineDate = moment(startDateAt).subtract(3, "hours");
    const interval = 1000;
    const countdown = setInterval(() => {
      let duration = moment.duration(deadlineDate.diff(moment()));
      if (duration.asSeconds() <= 0) {
        setCountDownCaption("마감");
        clearInterval(countdown);
      } else {
        const countDownCaption = `${duration.hours()}:${duration.minutes()}:${duration.seconds()} 후 마감`;
        console.log(countDownCaption);
        setCountDownCaption(countDownCaption);
      }
    }, interval);
    return () => {
      clearInterval(countdown);
    };
  }, [startDateAt]);

  return (
    <Container onClick={onClick}>
      <PlaceLeftContainer>
        {isClosed && (
          <>
            <PlaceFull />
            <PlaceFullText>마감 되었어요</PlaceFullText>
          </>
        )}
        {deadline && !isClosed && (
          <PlaceIndicator isRed={leftParticipantsCount <= 2}>
            <p>잔여{leftParticipantsCount}석</p>
          </PlaceIndicator>
        )}
        <PlaceCoverImage
          src={optimizeImage(coverImage, { width: 120, height: 120 })}
        />
      </PlaceLeftContainer>

      <PlaceRightContainer>
        <div>
          <FlexSpaceBetween>
            <PlaceSummary>
              <span className="bold">
                {" "}
                {getStartDateFromNow(startDateFromNow)}
              </span>
            </PlaceSummary>
            <ViewCount>
              <img src="/icons/eye.svg" />
              {views}
            </ViewCount>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <PlaceName>{name}</PlaceName>
          </FlexSpaceBetween>
          <PlaceSummary>{placeDetail?.description}</PlaceSummary>
        </div>
        <PlaceDeadline isTimerStart={!!countDownCaption}>
          {countDownCaption || deadline}
        </PlaceDeadline>
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
const PlaceCoverImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  display: inline-block;
`;

const PlaceRightContainer = styled.div`
  width: 205px;
  padding-left: 10px;
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlaceIndicator = styled.div<{ isRed: boolean }>`
  position: absolute;
  background-color: ${(props) =>
    props.isRed ? "rgba(255, 51, 51, 0.9)" : colors.MidBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px 0px 3px 0;
  width: 52px;
  height: 23px;
  top: 0px;
  left: 0px;
  p {
    color: white;
    font-weight: 500;
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
  font-size: 10.5px;
  line-height: 13px;
  color: #6f7789;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  .bold {
    font-weight: 500;
    color: #6f7789;
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

const PlaceDeadline = styled.p<{ isTimerStart: boolean }>`
  margin: 8px 0 6px;
  font-size: 10.5px;
  color: ${(props) => (props.isTimerStart ? "#FF3333" : "#929da9")};
  align-self: end;
`;

const PlaceName = styled.span`
  color: #12121dd4;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  margin: 5px 0;
`;
