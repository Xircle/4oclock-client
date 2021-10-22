import styled from "styled-components";
import {
  BottomNavBarContainer,
  colors,
  SpaceForNavBar,
} from "../../styles/styles";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useQuery } from "react-query";
import { GetMyRooms } from "../../lib/api/types";
import { getMyRooms } from "../../lib/api/getMyRooms";

interface Props {
  selectedItem: string;
}

export default function BottomNavBar({ selectedItem }: Props) {
  const { data } = useQuery<GetMyRooms | undefined>(
    ["room"],
    () => getMyRooms(),
    {
      retry: 1,
    }
  );

  return (
    <>
      <BottomNavBarContainer>
        <SUl>
          <SList selected={selectedItem === "places"}>
            <SLink to={routes.placeFeed} style={{}}>
              <span className="pageName">이팅모임</span>
            </SLink>
          </SList>

          <SList selected={selectedItem === "friends"}>
            <SLink
              to={routes.friend}
              style={{ textDecoration: "none", color: colors.Black }}
            >
              <span className="pageName">친구들</span>
            </SLink>
          </SList>

          <SList selected={selectedItem === "chat"}>
            <SLink to={routes.chatList} style={{ textDecoration: "none" }}>
              <span className="pageName">채팅</span>
            </SLink>
            <UnreadMessageIndicator hasUnreadMessage={data?.hasUnreadMessage} />
          </SList>

          <SList selected={selectedItem === "mypage"}>
            <SLink
              to={routes.myPage}
              style={{ textDecoration: "none", color: colors.Black }}
            >
              <span className="pageName">MY</span>
            </SLink>
          </SList>
        </SUl>
      </BottomNavBarContainer>
      <SpaceForNavBar />
    </>
  );
}

const UnreadMessageIndicator = styled.div<{ hasUnreadMessage?: boolean }>`
  display: ${(props) => !props.hasUnreadMessage && "none"};
  position: absolute;
  top: 35%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${colors.MidBlue};
`;

const SLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

const SUl = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
`;

const SList = styled.li<{ selected: boolean }>`
  position: relative;
  display: block;
  width: 93.75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? colors.MidBlue : "gray")};
  .pageName {
    font-size: 15px;
    color: ${(props) => (props.selected ? colors.MidBlue : "gray")};
  }
  svg {
    margin-bottom: 5px;
    font-size: 20px;
  }
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  list-style: none;
  word-break: keep-all;
`;
