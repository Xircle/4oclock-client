import styled from "styled-components";
import { colors } from "../../styles";

interface Props {
  placeImgSrc: string;
  feedTag?: string;
  feedLocation?: string;
  feedHeading: string;
  feedDetail?: string;
  feedTime?: string;
  feedCondition?: string;
}

export default function RegisteredFeed(props: Props) {
  return (
    <FeedContainer>
      <FeedLeftContainer>
        <FeedImg src={props.placeImgSrc} />
      </FeedLeftContainer>
      <FeedDescription>
        <FeedHeading>{props.feedHeading}</FeedHeading>
        <FeedDetailP>{props.feedDetail}</FeedDetailP>

        <FeedTimeSpan>{props.feedLocation}</FeedTimeSpan>
        <FeedTimeSpan style={{ marginRight: "3px", marginLeft: "3px" }}>
          /
        </FeedTimeSpan>
        <FeedTimeSpan>{props.feedTime}</FeedTimeSpan>
        <FeedTimeSpan style={{ marginLeft: "8px" }}>
          {props.feedCondition}
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
