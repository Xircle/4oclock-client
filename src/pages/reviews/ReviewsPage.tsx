import styled from "styled-components";
import { Container } from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router-dom";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {}

export default function ReviewsPage(props: Props) {
  const history = useHistory();
  return (
    <Container>
      <TopHeading>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ position: "absolute", left: "25px" }}
          onClick={() => {
            history.goBack();
          }}
        />
        # 열렸던 이팅모임 후기
      </TopHeading>
      <SubHeading>
        지금까지 열린 이팅모임후기에요
        <br />
        뭐든 함께 나누면 즐거워진다! 친구들과 놀러가요😊🥰
      </SubHeading>
      <GridContainer>
        <GridImg src="/avatar/Avartar001.jpeg" />
        <GridImg src="/avatar/Avartar001.jpeg" />
        <GridImg src="/avatar/Avartar001.jpeg" />
        <GridImg src="/avatar/Avartar001.jpeg" />
        <GridImg src="/avatar/Avartar001.jpeg" />
        <GridImg src="/avatar/Avartar001.jpeg" />
        <GridImg src="/avatar/Avartar001.jpeg" />
        <GridImg src="/avatar/Avartar001.jpeg" />
      </GridContainer>
      <BottomNavBar selectedItem="places" />
    </Container>
  );
}

const BackButton = styled.div``;

const TopHeading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  color: #6f7789;
  font-weight: 500;
  font-size: 16px;
  position: relative;
`;

const SubHeading = styled.div`
  margin-top: 15px;
  background-color: #dbedff;
  color: #18a0fb;
  padding: 15px 20px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  border-radius: 5px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3px;
  background-color: #fff;
  color: #444;
  padding-top: 20px;
`;

const GridImg = styled.img`
  width: 123px;
  height: 123px;
  object-fit: cover;
  cursor: pointer;
  position: relative;
`;
