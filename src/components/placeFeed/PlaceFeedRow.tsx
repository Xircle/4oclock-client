import styled from "styled-components";
import { colors } from "../../styles";
import { useState } from "react";
import type { PlaceFeedData } from "../../lib/api/types";
import Avatar from "../shared/Avatar";

interface Props extends PlaceFeedData {}

export default function PlaceFeedRow({
  name,
  coverImage,
  deadline,
  tags,
  recommendation,
  isClosed,
  participantsCount,
  startDateFromNow,
  participants,
  isParticipating,
}: Props) {
  const [parsedTags, _] = useState<string[]>(JSON.parse(tags));

  return (
    <Container>
      <PlaceLeftContainer>
        {isClosed && (
          <>
            <PlaceFull />
            <PlaceFullText>마감 되었어요</PlaceFullText>
          </>
        )}
        {deadline && (
          <PlaceDeadline>
            <p>{deadline}</p>
          </PlaceDeadline>
        )}
        <PlaceCoverImage src={coverImage} />
      </PlaceLeftContainer>

      <PlaceRightContainer>
        <PlaceRightWrapper>
          <PlaceName>{name}</PlaceName>
          <PlaceSpan>
            {startDateFromNow} / {recommendation}
          </PlaceSpan>
        </PlaceRightWrapper>

        <PlaceTags>#{parsedTags.join(" #")}</PlaceTags>

        <ParticipantsContainer>
          <ParticipantsWrapper isParticipating={isParticipating}>
            {participants.map((parti, idx) => {
              if (idx < 4) {
                return (
                  <Avatar key={parti.userId} rightOffset={"-8px"} {...parti} />
                );
              }
            })}
          </ParticipantsWrapper>
          {participantsCount > 4 ? <p>+{participantsCount - 4}</p> : null}
        </ParticipantsContainer>
      </PlaceRightContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
  &:hover {
    opacity: 0.8;
  }
`;
const PlaceLeftContainer = styled.div`
  width: 100px;
  height: 100px;
  padding: 0px;
  position: relative;
`;
const PlaceCoverImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const PlaceRightContainer = styled.div`
  width: 205px;
  padding-left: 16px;
  padding-top: 5px;
`;

const PlaceRightWrapper = styled.div`
  display: flex;
  align-content: center;
  justify-content: start;
`;

const PlaceDeadline = styled.div`
  position: absolute;
  background-color: ${colors.MidBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 18px;
  padding: 0px 5px 0px 5px;
  top: -5px;
  left: 8px;
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

const PlaceSpan = styled.span`
  margin-top: 3px;
  margin-left: 10px;
  font-size: 10px;
  color: #8c94a4;
`;

const PlaceName = styled.span`
  color: ${colors.StrongBlue};
  font-size: 15px;
  font-weight: 500;
`;
