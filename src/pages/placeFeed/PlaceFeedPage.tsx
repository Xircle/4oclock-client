import styled from "styled-components";
import MainPicDummy from "../../static/MainPicDummy.jpg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./PlaceFeedPage.css";
import { Option } from "react-dropdown";
import { colors, Container } from "../../styles";
import Header from "../../components/shared/header/Header";
import HeaderTextHeading from "../../components/shared/header/HeaderTextHeading";
import HeaderTextDescription from "../../components/shared/header/HeaderTextDescription";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { Link, RouteComponentProps } from "react-router-dom";
import routes from "../../routes";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getPlacesByLocation,
  PlaceLocation,
} from "../../lib/api/getPlacesByLocation";
import {
  CURRENT_USER,
  placeLocationoptions,
} from "../../components/shared/constants";
import { PlaceFeedData } from "../../lib/api/types";
import PlaceFeedRowsContainer from "../../components/placeFeed/PlaceFeedContainer";
import storage from "../../lib/storage";
import { toast } from "react-toastify";

interface Props extends RouteComponentProps {}

export default function PlaceFeedPage({ history }: Props) {
  const [page, setPage] = useState(1);
  const [selectedPlaceLocation, setSelectedPlaceLocation] =
    useState<PlaceLocation>(placeLocationoptions[0].value as PlaceLocation);

  const HandleChangeLocation = (option: Option) => {
    setSelectedPlaceLocation(option.value as PlaceLocation);
  };

  const { data: placeFeedDataArray, isError } = useQuery<
    PlaceFeedData[] | undefined
  >(
    ["place", selectedPlaceLocation, page],
    () => getPlacesByLocation(selectedPlaceLocation, page),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!storage.getItem(CURRENT_USER)) {
      toast.error("로그인하신 후에 이용해주세요.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      history.push(routes.root);
    }
  }, []);

  return (
    <Container>
      {/* Drop down */}
      <TopWrapper>
        <Top>
          <DropDownWrapper>
            <Dropdown
              controlClassName="drop-down-className"
              options={placeLocationoptions}
              value={selectedPlaceLocation}
              onChange={HandleChangeLocation}
            />
          </DropDownWrapper>
          <Link to={routes.request} style={{ textDecoration: "none" }}>
            <RequestP>써클 추가하기</RequestP>
          </Link>
        </Top>
      </TopWrapper>

      {/* Cover image & description */}
      <Header src={MainPicDummy}>
        <HeaderTextHeading>친구들과 놀러가요!</HeaderTextHeading>
        <HeaderTextDescription>
          취향이 통하는 대학친구들과 즐기는 공간
        </HeaderTextDescription>
      </Header>

      {/* Places Feed Rows container */}
      <PlaceFeedRowsWrapper>
        <PlaceFeedRowsContainer
          hasError={isError}
          placeFeedDataArray={placeFeedDataArray}
        />
      </PlaceFeedRowsWrapper>

      <BottomNavBar selectedItem="places" />
    </Container>
  );
}

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: --webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 12px 12px 0;
  justify-content: space-between;
  margin-top: 10px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RequestP = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.MidGray};
  padding-top: 8px;
`;

const PlaceFeedRowsWrapper = styled.div``;
