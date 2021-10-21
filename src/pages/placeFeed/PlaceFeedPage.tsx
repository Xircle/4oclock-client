import styled from "styled-components";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./PlaceFeedPage.css";
import { Option } from "react-dropdown";
import { colors, Container, SubText } from "../../styles/styles";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
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
  CURRENT_PLACE,
} from "../../components/shared/constants";
import { IRoom, PlaceFeedData } from "../../lib/api/types";
import PlaceFeedRowsContainer from "../../components/placeFeed/PlaceFeedContainer";
import storage from "../../lib/storage";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
import queryString from "query-string";
import InfoBox from "../../components/UI/InfoBox";
import { getMyRooms } from "../../lib/api/getMyRooms";
import { SetLocalStorageItemWithMyRoom } from "../../lib/helper";

interface Props extends RouteComponentProps {}

export default function PlaceFeedPage({ history, location }: Props) {
  const historyH = useHistory();
  const UrlSearch = location.search;
  const [page, setPage] = useState(1);
  const [selectedPlaceLocation, setSelectedPlaceLocation] =
    useState<PlaceLocation>(placeLocationoptions[0].value as PlaceLocation);
  const isLoggedIn = Boolean(
    queryString.parse(UrlSearch).isLoggedIn === "true"
  );
  const isSignup = Boolean(queryString.parse(UrlSearch).isSignup === "true");

  const HandleChangeLocation = (option: Option) => {
    storage.setItem(CURRENT_PLACE, option.value as PlaceLocation);
    setSelectedPlaceLocation(option.value as PlaceLocation);
  };

  const {
    data: placeFeedDataArray,
    isLoading,
    isError,
  } = useQuery<PlaceFeedData[] | undefined>(
    ["place", selectedPlaceLocation, page],
    () => getPlacesByLocation(selectedPlaceLocation, page),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );

  const { data: myRooms } = useQuery<IRoom[] | undefined>(
    ["room"],
    () => getMyRooms(),
    {
      retry: 1,
    }
  );

  useEffect(() => {
    if (!myRooms || myRooms.length === 0) return;
    SetLocalStorageItemWithMyRoom(myRooms);
  }, [myRooms]);

  useEffect(() => {
    if (!storage.getItem(CURRENT_USER)) {
      toast.info("로그인하신 후에 이용해주세요.", {
        position: toast.POSITION.TOP_CENTER,
      });
      history.push(routes.root);
      return;
    }

    if (isLoggedIn) {
      toast.success("다시 돌아오신 것을 환영합니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
      historyH.replace(location.pathname);
    } else if (isSignup) {
      toast.success("가입이 완료되었습니다!", {
        position: toast.POSITION.TOP_CENTER,
      });
      historyH.replace(location.pathname);
    }

    if (!storage.getItem(CURRENT_PLACE)) {
      storage.setItem(CURRENT_PLACE, selectedPlaceLocation);
    } else {
      setSelectedPlaceLocation(storage.getItem(CURRENT_PLACE));
    }
  }, []);

  return (
    <Container>
      <PageTitle title="맛집 피드" />
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
            <RequestP>맛집 모임 만들기 {"+"}</RequestP>
          </Link>
        </Top>
      </TopWrapper>

      {/* Header info text  */}
      <InfoBox>
        수시로 번개모임들이 올라와요 {"😄 "}가고 싶은 모임을{" "}
        <b>확인하고{">"}놀러가기</b>를 누르면 신청 완료!
      </InfoBox>

      {/* Places Feed Rows container */}
      <PlaceFeedRowsWrapper>
        <PlaceFeedRowsContainer
          hasError={isError}
          isLoading={isLoading}
          placeFeedDataArray={placeFeedDataArray}
        />
      </PlaceFeedRowsWrapper>

      {/* Bottom Info text */}
      <BottomInfoTextContainer>
        <BottomInfoText>
          {"'"}연고이팅{"'"}은 대학친구들과 따뜻한 밥 한끼, 술 한잔 할 수 있는
          문화를 여러분들과 함께 만들어나갔으면 좋겠어요{"😊"}
          <br /> <br />
          아직 베타 서비스 단계로 여러분들의 피드백이 간절해요.
          <br />
          많이 많이 부탁드리겠습니다{"🙌"}
        </BottomInfoText>
      </BottomInfoTextContainer>
      <BottomNavBar selectedItem="places" />
    </Container>
  );
}

const TopInfoTextContainer = styled.div`
  margin: 16px 25px 15px;
`;

const TopInfoText = styled(SubText)`
  font-size: 12px;
`;

const BottomInfoTextContainer = styled.div`
  margin: 36px auto;
  width: 330px;
`;

const BottomInfoText = styled(SubText)`
  color: ${colors.MidGray};
  font-size: 13px;
  line-height: 16px;
`;

const Heading = styled.div`
  width: 308px;
  border-radius: 4px;
  background: #dbedff;
  margin-left: auto;
  margin-right: auto;
  color: #18a0fb;
  font-size: 13px;
  line-height: 18px;
  font-weight: normal;
  padding: 12px 18px;

  b {
    font-weight: bold;
  }
`;

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
  padding: 12px 22px 12px 0;
  justify-content: space-between;
  margin-top: 10px;
`;

const DropDownWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const RequestP = styled.div`
  font-size: 14px;
  font-weight: normal;
  color: ${colors.MidGray};
  padding-top: 8px;
`;

const PlaceFeedRowsWrapper = styled.div`
  min-height: 50vh;
`;
