import styled from "styled-components";
import {
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  Heading,
  colors,
} from "../../styles";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { feedDummyData } from "../../dummyResources/dummyData";
import { Link } from "react-router-dom";
import routes from "../../routes";
import RegisteredFeed from "../../components/mypage/RegisteredFeed";
import { Fragment } from "react";

interface Props {}

export default function MyXirclePage(props: Props) {
  return (
    <ContainerFlexColumn>
      <ContainerwithLeftRightMargin>
        <Heading>내가 신청한 써클</Heading>
        {feedDummyData.map((item, idx) => {
          return (
            <Fragment key={idx}>
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
            </Fragment>
          );
        })}
      </ContainerwithLeftRightMargin>
      <BottomNavBar selectedItem="mypage"></BottomNavBar>
    </ContainerFlexColumn>
  );
}
