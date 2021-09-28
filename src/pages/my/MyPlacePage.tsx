import ClipLoader from "react-spinners/ClipLoader";
import {
  ContainerFlexColumn,
  ContainerwithLeftRightMargin,
  Heading,
  Label,
  colors,
} from "../../styles/styles";
import BottomNavBar from "../../components/shared/BottomNavBar";
import RegisteredFeed from "../../components/my/RegisteredFeed";
import { Fragment, useEffect } from "react";
import { useQuery } from "react-query";
import { MyPlaceData } from "../../lib/api/types";
import { getMyPlaces } from "../../lib/api/getMyPlaces";
import BackButtonLayout from "../../components/shared/BackButtonLayout";
import PageTitle from "../../components/PageTitle";
import { useHistory } from "react-router-dom";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";

export default function MyPlacePage() {
  const history = useHistory();
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

  return (
    <ContainerFlexColumn>
      <PageTitle title="My Xircle" />
      <BackButtonLayout>
        <ContainerwithLeftRightMargin style={{ width: "90%" }}>
          <Heading>내가 신청한 써클</Heading>
          {!myPlacesData ||
            (myPlacesData.length === 0 && (
              <Label>신청한 써클이 없어요 :(</Label>
            ))}
        </ContainerwithLeftRightMargin>
        {myPlacesData?.map((item) => {
          return (
            <RegisteredFeed
              key={item.id}
              isClosed={item.isClosed}
              coverImage={item.coverImage}
              name={item.name}
              startDateFromNow={item.startDateFromNow}
              recommendation={item.recommendation}
              onClick={() => history.push(`/place/${item.id}?myPlace=true`)}
            />
          );
        })}
        <BottomNavBar selectedItem="mypage"></BottomNavBar>
      </BackButtonLayout>
      {isLoading && (
        <>
          <LoaderBackdrop />
          <LoaderWrapper>
            <ClipLoader
              loading={isLoading}
              color={colors.MidBlue}
              css={{
                name: "width",
                styles: "border-width: 4px; z-index: 999;",
              }}
              size={30}
            />
          </LoaderWrapper>
        </>
      )}
    </ContainerFlexColumn>
  );
}
