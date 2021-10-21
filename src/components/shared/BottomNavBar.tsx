import styled from "styled-components";
import {
  BottomNavBarContainer,
  colors,
  SpaceForNavBar,
} from "../../styles/styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faStar,
  faUser,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import routes from "../../routes";

interface Props {
  selectedItem: string;
}

export default function BottomNavBar({ selectedItem }: Props) {
  return (
    <>
      <BottomNavBarContainer>
        <Link to={routes.placeFeed} style={{ textDecoration: "none" }}>
          <BottomNavBarItem selected={selectedItem === "places"}>
            <FontAwesomeIcon icon={faUtensils} />
            <span className="pageName">이팅모임</span>
          </BottomNavBarItem>
        </Link>

        <Link
          to={routes.friend}
          style={{ textDecoration: "none", color: colors.Black }}
        >
          <BottomNavBarItem selected={selectedItem === "friends"}>
            <FontAwesomeIcon icon={faStar} />
            <span className="pageName">친구들</span>
          </BottomNavBarItem>
        </Link>
        <Link to={routes.chatList} style={{ textDecoration: "none" }}>
          <BottomNavBarItem selected={selectedItem === "chat"}>
            <FontAwesomeIcon icon={faComments} />
            <span className="pageName">채팅</span>
          </BottomNavBarItem>
        </Link>
        <Link
          to={routes.myPage}
          style={{ textDecoration: "none", color: colors.Black }}
        >
          <BottomNavBarItem selected={selectedItem === "mypage"}>
            <FontAwesomeIcon icon={faUser} />
            <span className="pageName">MY</span>
          </BottomNavBarItem>
        </Link>
      </BottomNavBarContainer>
      <SpaceForNavBar />
    </>
  );
}

const BottomNavBarItem = styled.div<{ selected: boolean }>`
  width: 93.75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.selected ? colors.MidBlue : "gray")};
  .pageName {
    font-size: 12px;
    color: ${(props) => (props.selected ? colors.MidBlue : "gray")};
    opacity: ${(props) => (props.selected ? 1 : 0)};
  }
  svg {
    margin-bottom: 5px;
    font-size: 20px;
  }
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;
