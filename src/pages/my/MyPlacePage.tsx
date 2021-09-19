import {
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  Heading,
  SLink,
  Label,
} from "../../styles";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { Link } from "react-router-dom";
import routes from "../../routes";
import RegisteredFeed from "../../components/my/RegisteredFeed";
import { Fragment, useEffect } from "react";
import { useQuery } from "react-query";
import { MyPlaceData } from "../../lib/api/types";
import { getMyPlaces } from "../../lib/api/getMyPlaces";
import BackButtonLayout from "../../components/shared/BackButtonLayout";

export default function MyPlacePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: myPlacesData, isLoading } = useQuery<MyPlaceData[]>(
    "myPlaces",
    () => getMyPlaces(),
    { retry: 1, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (!isLoading && !myPlacesData) {
      alert("로그인이 필요합니다!");
      window.location.href = "/";
    }
  }, [myPlacesData, isLoading]);

  if (isLoading) return <p>로딩중...</p>;
  if (!myPlacesData) return null;

  return (
    <ContainerFlexColumn>
      <BackButtonLayout>
        <ContainerwithLeftRightMargin>
          <Heading>내가 신청한 써클</Heading>
          {myPlacesData.length === 0 && <Label>신청한 써클이 없어요 :(</Label>}
          {myPlacesData.map((item) => {
            return (
              <SLink
                key={item.id}
                to={{
                  pathname: `/place/${item.id}`,
                }}
              >
                <RegisteredFeed
                  isClosed={item.isClosed}
                  coverImage={item.coverImage}
                  name={item.name}
                  tags={"#" + JSON.parse(item.tags).join(" #")}
                  startDateFromNow={item.startDateFromNow}
                  recommendation={item.recommendation}
                />
              </SLink>
            );
          })}
        </ContainerwithLeftRightMargin>
        <BottomNavBar selectedItem="mypage"></BottomNavBar>
      </BackButtonLayout>
    </ContainerFlexColumn>
  );
}
