import styled from "styled-components";
import React, { useState } from "react";
import MainPicDummy from "../../dummyResources/MainPicDummy.jpg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./PlacesPage.css";
import { Option } from "react-dropdown";
import { colors, Container } from "../../Styles";
import Header from "../../components/shared/Header/Header";
import HeaderTextHeading from "../../components/shared/Header/HeaderTextHeading";
import HeaderTextDescription from "../../components/shared/Header/HeaderTextDescription";
import Place from "../../components/places/Place";
import { feedDummyData } from "../../dummyResources/dummyData";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { Link } from "react-router-dom";
import routes from "../../Routes";

const options: Option[] = [
  {
    value: "안암근처",
    label: "안암근처",
    className: "drop-down-option",
  },
  {
    value: "신촌근처",
    label: "신촌근처",
    className: "drop-down-option",
  },
  {
    value: "혜화근처",
    label: "혜화근처",
    className: "drop-down-option",
  },
];

interface Props {}

export default function PlacesPage(props: Props) {
  return (
    <Container>
      <Top>
        <TopWrapper>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Dropdown
              controlClassName="drop-down-className"
              options={options}
              value={options[0]}
            />
          </div>
          <Link to={routes.request} style={{ textDecoration: "none" }}>
            <RequestP>서클 추가하기</RequestP>
          </Link>
        </TopWrapper>
      </Top>
      <Header src={MainPicDummy}>
        <HeaderTextHeading>친구들과 놀러가요!</HeaderTextHeading>
        <HeaderTextDescription>
          취향이 통하는 대학친구들과 즐기는 공간
        </HeaderTextDescription>
      </Header>
      {feedDummyData.map((item) => {
        return (
          <Link
            to={routes.place}
            style={{ textDecoration: "none", color: colors.Black }}
          >
            <Place
              placeImgSrc={item.placeImgSrc}
              placeParticipant={item.feedParticipant}
              placeClosed={item.feedClosed}
              placeHeading={item.feedHeading}
              placeDetail={item.feedDetail}
              placeLocation={item.feedLocation}
              placeTime={item.feedTime}
              placeCondition={item.feedCondition}
              placeTag={item.feedTag}
            ></Place>
          </Link>
        );
      })}
      <BottomNavBar selectedItem="places" />
    </Container>
  );
}

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: --webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: white;
`;

const TopWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 12px 12px 0;
  justify-content: space-between;
  margin-top: 10px;
`;

const RequestP = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.MidGray};
  padding-top: 8px;
`;
