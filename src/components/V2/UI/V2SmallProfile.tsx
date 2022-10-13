import styled from "styled-components";
import optimizeImage from "../../../lib/optimizeImage";
import storage from "../../../lib/storage";
import { RoleHashTable } from "../../../lib/v2/utils";
import { CURRENT_USER } from "../../shared/constants";

interface Props {}

export default function V2SmallProfile(props: Props) {
  return (
    <Container>
      <LeftContainer>
        <ProfileImg
          src={optimizeImage(
            storage.getItem(CURRENT_USER)?.profile?.thumbnail,
            {
              width: 80,
              height: 80,
            },
          )}
        />
      </LeftContainer>
      <RightContainer>
        <NameTag>{storage.getItem(CURRENT_USER)?.username}</NameTag>
        <RoleTag>
          {RoleHashTable[storage.getItem(CURRENT_USER)?.profile?.role]}
        </RoleTag>
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding-left: 20px;
`;

const NameTag = styled.div`
  color: #50555c;
  font-weight: 500;
  font-size: 15px;
`;

const RoleTag = styled.div`
  color: #fd8a66;
  font-weight: 500;
  font-size: 15px;
`;
