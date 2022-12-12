import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import LeaderTeamRow from "../../../components/V2/Team/LeaderTeamRow";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import V2SmallProfile from "../../../components/V2/UI/V2SmallProfile";
import { getMyTeamsLeader } from "../../../lib/api/getMyTeamsLeader";
import { MyTeamsLeader } from "../../../lib/api/types";
import routes from "../../../routes";

export default function V2LeaderPage() {
  const history = useHistory();
  const { data: teamData } = useQuery<MyTeamsLeader[] | undefined>(
    ["leaderTeam"],
    () => getMyTeamsLeader(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const createTeamCTA = () => {
    history.push(routes.v2CreateTeamPage);
  };

  return (
    <Container>
      <V2HeaderC title="리더 page" />
      <BodyItem>
        <BodyItemHeading>회원 정보</BodyItemHeading>
        <V2SmallProfile />
      </BodyItem>
      <Body>
        <BodyItem>
          <BodyItemHeading>my 클럽</BodyItemHeading>
          {teamData && teamData?.length > 0 ? (
            teamData?.map((item) => {
              return (
                <LeaderTeamRow
                  key={item.teamId}
                  image={item.teamImage}
                  name={item.name}
                  id={item.teamId}
                  total={item.total}
                  count={item.count}
                />
              );
            })
          ) : (
            <CreateTeamButton onClick={createTeamCTA}>
              my 정기 모임 생성하기
            </CreateTeamButton>
          )}
        </BodyItem>
      </Body>
    </Container>
  );
}

const CreateTeamButton = styled.div`
  cursor: pointer;
  background: rgba(33, 225, 156, 0.33);
  border-radius: 10px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 18px;
  color: #505050;
  font-weight: 700;
  font-size: 18px;
`;

const Container = styled.div``;

const Body = styled.div``;

const BodyItem = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  margin-bottom: 20px;
  min-height: 100px;
`;

const BodyItemHeading = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;
