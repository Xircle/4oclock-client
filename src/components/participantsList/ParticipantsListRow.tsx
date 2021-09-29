import styled from "styled-components";
import { colors, Heading, Avartar, SubText } from "../../styles/styles";
import type { ParticipantsListData } from "../../lib/api/types";
import { normalize } from "path";

interface Props extends ParticipantsListData {}

export default function ParticipantsListRow({
  job,
  shortBio,
  profileImgUrl,
}: Props) {
  return (
    <Container>
      <ParticipantLeftContainer>
        <Avartar
          src={profileImgUrl || "/avatar/anonymous_user.png"}
          style={{
            width: "56px",
            height: "56px",
            margin: "0px",
            filter: "blur(1px)",
          }}
        />
      </ParticipantLeftContainer>
      <ParticipantRightContainer>
        <JobText>{job}</JobText>
        <ShortBioText>{shortBio}</ShortBioText>
      </ParticipantRightContainer>
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
  cursor: pointer;
`;

const ParticipantLeftContainer = styled.div`
  width: 50px;
  height: 50px;
  padding: 0px;
  position: relative;
`;

const ParticipantRightContainer = styled.div`
  width: 265px;
  padding-left: 20px;
`;

const JobText = styled(SubText)`
  width: 100%;
  font-size: 12px;
  margin-top: 2px;
  color: ${colors.MidGray};
`;

const ShortBioText = styled(SubText)`
  width: 100%;
  font-size: 12px;
  margin-top: 4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 14px;
  color: ${colors.Black};
`;
