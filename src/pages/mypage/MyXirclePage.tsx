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
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { MyPlaceData } from "../../lib/api/types";
import { getMyPlaces } from "../../lib/api/getMyPlaces";

interface Props {}

export default function MyXirclePage(props: Props) {
  const { data: myPlacesData, isLoading } = useQuery<MyPlaceData[]>(
    "myPlaces",
    () => getMyPlaces(),
    { retry: 1, refetchOnWindowFocus: false }
  );
  return (
    <ContainerFlexColumn>
      <ContainerwithLeftRightMargin>
        <Heading>내가 신청한 써클</Heading>
        {myPlacesData?.map((item, idx) => {
          return (
            <Fragment key={idx}>
              <Link
                to={routes.place}
                style={{ textDecoration: "none", color: colors.Black }}
              >
                <RegisteredFeed
                  placeImgSrc={item.coverImage}
                  feedHeading={item.name}
                  feedDetail={"#" + JSON.parse(item.tags).join(" #")}
                  feedTime={item.startDateFromNow}
                  feedCondition={item.recommendation}
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
