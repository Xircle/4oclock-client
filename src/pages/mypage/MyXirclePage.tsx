import styled from "styled-components";
import {
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  Heading,
  colors,
} from "../../Styles";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { feedDummyData } from "../../dummyResources/dummyData";
import { Link } from "react-router-dom";
import routes from "../../Routes";
import RegisteredFeed from "../../components/mypage/RegisteredFeed";

interface Props {}

export default function MyXirclePage(props: Props) {
  return (
    <ContainerFlexColumn>
      <ContainerwithLeftRightMargin>
        <Heading>내가 신청한 써클</Heading>
        {feedDummyData.map((item) => {
        return (
          <Link
            to={routes.place}
            style={{ textDecoration: "none", color: colors.Black }}
          >
            <RegisteredFeed
              placeImgSrc={item.placeImgSrc}
              feedParticipant={item.feedParticipant}
              feedClosed={item.feedClosed}
              feedHeading={item.feedHeading}
              feedDetail={item.feedDetail}
              feedLocation={item.feedLocation}
              feedTime={item.feedTime}
              feedCondition={item.feedCondition}
              feedTag={item.feedTag}
            ></RegisteredFeed>
          </Link>
        );
      })}
      </ContainerwithLeftRightMargin>
      <BottomNavBar selectedItem="mypage"></BottomNavBar>
    </ContainerFlexColumn>
  );
}
