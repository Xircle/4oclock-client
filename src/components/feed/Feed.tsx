import styled from "styled-components";
import { colors } from "../../styles";
import Avartar from "../shared/Avatar";

interface Props {
  placeImgSrc: string;
  feedClosed?: boolean;
  feedTag?: string;
  feedParticipant: string[];
  feedLocation?: string;
  feedHeading: string;
  feedDetail?: string;
  feedTime?: string;
  feedCondition?: string;
}

export default function Feed(props: Props) {
  //const tag: string | null | undefined = props.feedTag;

  return (
    <FeedContainer>
      <FeedLeftContainer>
        {props.feedClosed && (
          <FeedFull>
            <p>마감</p>
          </FeedFull>
        )}
        {props.feedTag && (
          <FeedTag>
            <p>{props.feedTag}</p>
          </FeedTag>
        )}
        <FeedImg src={props.placeImgSrc} />
      </FeedLeftContainer>
      <FeedDescription>
        <FeedHeading>{props.feedHeading}</FeedHeading>
        <FeedDetailP>{props.feedDetail}</FeedDetailP>

        <FeedTimeP>{props.feedLocation}</FeedTimeP>
        <FeedTimeP style={{ marginRight: "3px", marginLeft: "3px" }}>
          /
        </FeedTimeP>
        <FeedTimeP>{props.feedTime}</FeedTimeP>
        <FeedTimeP style={{ marginLeft: "8px" }}>
          {props.feedCondition}
        </FeedTimeP>
        <AvartarContainer>
          {props.feedParticipant.map((item, idx) => {
            if (idx < 4) {
              return <Avartar profileImgUrl={item} rightOffset={"-5px"} />;
            }
          })}

          {props.feedParticipant.length > 4 ? (
            <p>+{props.feedParticipant.length}</p>
          ) : null}
        </AvartarContainer>
      </FeedDescription>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
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
  border-radius: 10%;
  object-fit: cover;
`;

const FeedDescription = styled.div`
  width: 200px;
  padding-left: 10px;
  padding-top: 5px;
`;

const FeedTag = styled.div`
  position: absolute;
  background-color: ${colors.MidBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 18px;
  padding: 0px 5px 0px 5px;
  top: -5px;
  transform: translateX(-8px);

  p {
    color: white;
    font-weight: 700;
    font-size: 11px;
  }
`;

const FeedFull = styled.div`
  position: absolute;
  background-color: gray;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  border-radius: 15%;
  justify-content: center;
  display: flex;
  align-items: center;
  p {
    color: white;
    font-weight: 800;
  }
`;

const AvartarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  p {
    position: absolute;
    left: 110px;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.LightGray};
  }
`;
const FeedDetailP = styled.p`
  margin-top: 3px;
  font-size: 10px;
`;

const FeedTimeP = styled.span`
  margin-top: 3px;
  font-size: 10px;
  color: ${colors.LightGray};
`;

const FeedHeading = styled.h4`
  color: ${colors.StrongBlue};
  font-size: 15px;
  font-weight: 400;
`;
