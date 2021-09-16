import styled from "styled-components";
import { colors } from "../../styles";
import Avartar from "../shared/Avartar";
import { Fragment } from "react";

interface Props {
  placeImgSrc: string;
  placeClosed?: boolean;
  placeTag?: string;
  placeParticipant: string[];
  placeLocation?: string;
  placeHeading: string;
  placeDetail?: string;
  placeTime?: string;
  placeCondition?: string;
}

export default function Place(props: Props) {
  //const tag: string | null | undefined = props.feedTag;

  return (
    <PlaceContainer>
      <PlaceLeftContainer>
        {props.placeClosed && (
          <>
            <PlaceFull></PlaceFull>
            <PlaceFullText>마감 되었어요</PlaceFullText>
          </>
        )}
        {props.placeTag && (
          <PlaceTag>
            <p>{props.placeTag}</p>
          </PlaceTag>
        )}
        <PlaceImg src={props.placeImgSrc} />
      </PlaceLeftContainer>
      <PlaceDescription>
        <div
          style={{
            alignContent: "center",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <PlaceHeading>{props.placeHeading}</PlaceHeading>
          <PlaceTimeSpan style={{ marginLeft: "7px" }}>
            {props.placeTime}
          </PlaceTimeSpan>
          <PlaceTimeSpan
            style={{
              marginRight: "3px",
              marginLeft: "3px",
            }}
          >
            /
          </PlaceTimeSpan>
          <PlaceTimeSpan>{props.placeCondition}</PlaceTimeSpan>
        </div>

        <PlaceDetailP style={{ marginTop: "5px" }}>
          {props.placeDetail}
        </PlaceDetailP>

        <AvartarContainer>
          {props.placeParticipant.map((item, idx) => {
            if (idx < 4) {
              return (
                <Fragment key={idx}>
                  <Avartar src={item} marginRight={"-5px"} />
                </Fragment>
              );
            }
          })}

          {props.placeParticipant.length > 4 ? (
            <p>+{props.placeParticipant.length}</p>
          ) : null}
        </AvartarContainer>
      </PlaceDescription>
    </PlaceContainer>
  );
}

const PlaceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;
const PlaceLeftContainer = styled.div`
  width: 100px;
  height: 100px;
  padding: 0px;
  position: relative;
`;
const PlaceImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const PlaceDescription = styled.div`
  width: 205px;
  padding-left: 16px;
  padding-top: 5px;
`;

const PlaceTag = styled.div`
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

const PlaceFull = styled.div`
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
const PlaceFullText = styled.div`
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

const AvartarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 17px;
  p {
    position: absolute;
    left: 110px;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.LightGray};
  }
`;
const PlaceDetailP = styled.p`
  margin-top: 3px;
  font-size: 10px;
`;

const PlaceTimeSpan = styled.span`
  margin-top: 3px;
  font-size: 10px;
  color: ${colors.LightGray};
`;

const PlaceHeading = styled.span`
  color: ${colors.StrongBlue};
  font-size: 15px;
  font-weight: 500;
`;
