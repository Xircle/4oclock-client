import { useHistory } from "react-router-dom";
import styled from "styled-components";
import optimizeImage from "../../../lib/optimizeImage";
import { DayNumToKor } from "../../../lib/v2/utils";

interface IProps {
  image?: string;
  name?: string;
  max_age?: number;
  min_age?: number;
  leader_username?: string;
  leader_id?: string;
  leader_image?: string;
  meeting_day?: number;
  meeting_hour?: string;
  description?: string;
  category_name?: string;
  id: string;
  applyCount?: number;
  approveCount?: number;
  maxParticipant?: number;
}

export default function TeamFeedRenderItem({
  image,
  name,
  max_age,
  min_age,
  description,
  meeting_day,
  meeting_hour,
  category_name,
  leader_image,
  leader_username,
  id,
  approveCount,
  applyCount,
  maxParticipant,
}: IProps) {
  const history = useHistory();

  const onClickHandler = () => {
    history.push(`/v2/team/${id}`);
  };

  return (
    <Conatiner onClick={onClickHandler}>
      <TagContainer>
        <Tag>
          {min_age} ~ {max_age}
        </Tag>
        <Tag>
          {DayNumToKor(meeting_day?.toString())} {meeting_hour}시
        </Tag>

        <Tag>{category_name}</Tag>
      </TagContainer>
      <Wrapper>
        <LeftContainer>
          <LeftBodyContainer>
            <Title>{name}</Title>
            {leader_image && leader_username ? (
              <LeaderContainer>
                <LeaderImg
                  src={optimizeImage(leader_image, {
                    width: 30,
                    height: 30,
                  })}
                />{" "}
                <LeaderText>{leader_username} leader</LeaderText>
              </LeaderContainer>
            ) : (
              <></>
            )}
            <BottomContainer>
              <Description>{description}</Description>
            </BottomContainer>
            <Count>
              정원: {maxParticipant ?? "na"} /
              {approveCount &&
              maxParticipant &&
              maxParticipant - approveCount > 0
                ? "잔여: " + (maxParticipant - approveCount)
                : ""}{" "}
              / 신청 {applyCount ?? "na"}
            </Count>
          </LeftBodyContainer>
        </LeftContainer>
        <RightContainer>
          <FeedImg
            src={optimizeImage(image, {
              width: 100,
              height: 100,
            })}
          />
        </RightContainer>
      </Wrapper>
    </Conatiner>
  );
}

const Count = styled.div`
  margin-top: 10px;
  font-size: 11px;
`;

const BottomContainer = styled.div``;

const LeaderContainer = styled.div`
  margin-top: 14px;
  white-space: nowrap;
  overflow-x: hidden;
  max-width: 200px;
  align-items: center;
  display: flex;
`;

const LeaderText = styled.span`
  margin-left: 5px;
  color: #8c94a4;
  font-size: 11px;
  font-weight: bold;
`;

const Description = styled.div`
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: clip;
  color: #8c94a4;
  margin-top: 10px;
  font-size: 11px;
  overflow: hidden;
`;

const Tag = styled.span`
  border: 1px solid #21e19c;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 10px;
  margin-right: 5px;
  display: inline-block;
  padding-top: 2px;
  padding-bottom: 2px;
  font-size: 14px;
`;

const TagContainer = styled.div`
  width: 100%;
  max-width: 375px;
  white-space: nowrap;
  overflow-x: hidden;
`;

const Wrapper = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 5px;

  padding-bottom: 15px;
  border-bottom: 1px solid #dadada;
`;

const Conatiner = styled.div`
  width: 100%;
  padding-left: 30px;
  padding-right: 20px;
  padding-top: 10px;

  color: #505050;

  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
`;
const LeftBodyContainer = styled.div`
  padding: 5px;
`;

const LeftContainer = styled.div`
  flex: 1;
  max-width: 210px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 700;
`;

const RightContainer = styled.div`
  width: 100px;
  height: 100px;
`;

const FeedImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10%;
  object-fit: cover;
`;

const LeaderImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  object-fit: cover;
  display: inline-block;
`;
