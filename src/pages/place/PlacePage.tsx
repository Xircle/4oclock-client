import styled from "styled-components";
import {
  colors,
  Container,
  SpaceForNavBar,
  BottomFixedButtonContainer,
  MainBtn,
  BottomFixedButtoninContainer,
  FlexDiv,
  BottomFixedIndicationContainer,
} from "../../styles/styles";
import { RouteComponentProps, useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import {
  faMapMarkerAlt,
  faEye,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getPlaceById } from "../../lib/api/getPlaceById";
import type { Participants, PlaceData } from "../../lib/api/types";
import {
  CalculateDDay,
  encodeUrlSlug,
  CalculateCloseDay,
  StartDateFromNowToString,
} from "../../lib/utils";
import Avatar from "../../components/shared/Avatar";
import { LoaderBackdrop, LoaderWrapper } from "../../components/shared/Loader";
import { useQuery } from "react-query";
import queryString from "query-string";
import routes from "../../routes";
import Modal from "../../components/UI/Modal";
import PageTitle from "../../components/PageTitle";
import { ReservationModalWrapper } from "../reservation/ReservationPage";
import optimizeImage from "../../lib/optimizeImage";

const kakao = window.kakao;
declare global {
  interface Window {
    kakao: any;
  }
}
interface MatchParmas {
  placeId: string;
}
interface LocationState {
  placeId: string;
  coverImage: string;
  name: string;
  participantsCount: number;
  isLightning: boolean;
  views: number;
  startDateFromNow: string;
  startTime: number;
  isParticipating: boolean;
  isClosed: boolean;
  participants: Participants[];
  startDateAt: string;
}
interface Props extends RouteComponentProps<MatchParmas, {}, LocationState> {}

export default function PlacePage({ match, location }: Props) {
  const history = useHistory();
  const { placeId } = match.params;
  const UrlSearch = location.search;
  const {
    name,
    coverImage,
    participantsCount,
    views,
    startDateFromNow,
    isParticipating,
    startDateAt,
    participants,
  } = location?.state || {};
  const isFinal = Boolean(queryString.parse(UrlSearch).isFinal === "true");
  const isClosed = Boolean(queryString.parse(UrlSearch).isClosed === "true");
  const showCancelBtn = Boolean(
    queryString.parse(UrlSearch).showCancelBtn === "true",
  );
  const [isCancleBtnClicked, setIsCancleBtnClicked] = useState(false);

  const scrollToProfile = Boolean(
    queryString.parse(UrlSearch).scrollToProfile === "true",
  );
  const { data: placeData, isLoading } = useQuery<PlaceData | undefined>(
    ["place-detail", placeId],
    () => getPlaceById(placeId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  // Scroll Conditionally
  useEffect(() => {
    if (scrollToProfile) {
      document.getElementById("participant")?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const CTAClickedHandler = () => {
    if (!placeData) return;
    if (showCancelBtn) {
      // alert("????????? ?????? ??? ?????????????????? ?????? ??????????????????");
      setIsCancleBtnClicked(true);
    } else if (!placeData.isParticipating) {
      history.push(`/reservation/${encodeUrlSlug(placeData.name)}`, {
        placeId,
        startDateFromNow: placeData.startDateFromNow,
        startTime: placeData.startTime,
        detailAddress: placeData.placeDetail.detailAddress,
        recommendation: placeData.recommendation,
        participationFee: placeData.placeDetail.participationFee,
      });
    }
  };

  useEffect(() => {
    if (!placeData) return;
    searchAddress(placeData.placeDetail.detailAddress);
  }, [placeData]);

  const searchAddress = (address: string | undefined) => {
    if (!address) return;
    const geocoder = new kakao.maps.services.Geocoder();
    const callback = function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        displayMap(result);
      }
    };
    geocoder.addressSearch(address, callback);
  };

  const displayMap = (result: any) => {
    if (!placeData?.placeDetail.detailAddress) return;
    const latitude = result[0].y;
    const longitude = result[0].x;
    const mapContainer = document.getElementById("map"),
      mapOption = {
        center: new kakao.maps.LatLng(latitude, longitude),
        level: 4,
      };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const coords = new kakao.maps.LatLng(latitude, longitude);

    // ??????????????? ?????? ????????? ????????? ???????????????
    new kakao.maps.Marker({
      map,
      position: coords,
    });

    map.setCenter(coords);
  };

  const BackButtonClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (scrollToProfile) {
      history.push(routes.placeFeed);
    } else {
      history.goBack();
    }
  };

  return (
    <Container>
      <PageTitle title="?????? ??????" />
      {isLoading && (
        <>
          <LoaderBackdrop />
          <LoaderWrapper top={"20%"}>
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
      {/* Cover Image */}
      <SHeader>
        <SHeaderPic
          src={optimizeImage(placeData?.coverImage || coverImage, {
            width: 375,
            height: 230,
          })}
          alt={placeData && placeData?.name + "??????"}
        />
        <TempToBeDeleted></TempToBeDeleted>
        <BackContainer onClick={BackButtonClickHandler}>
          <BackButton>
            <FontAwesomeIcon icon={faArrowLeft} size="1x" color="white" />
          </BackButton>
        </BackContainer>
        <HeaderText>
          <SHeaderCategoryIndicator>
            {placeData?.participantsCount || "N"}??? ?????????
          </SHeaderCategoryIndicator>
          <SHeaderTextHeading>{placeData?.name || name} </SHeaderTextHeading>
          <FlexSpaceBetween>
            <ViewCount>
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "4px" }} />{" "}
              {placeData?.views || views}
            </ViewCount>
          </FlexSpaceBetween>
        </HeaderText>
      </SHeader>
      {/* Recommendation */}
      <PlaceSummaryInformation>
        <span>{placeData?.recommendation || "??????"}</span> ????????? ??????????????????.
        <br />
        {startDateFromNow !== "??????" && (
          <span>
            {StartDateFromNowToString(startDateFromNow)}??? ????????? ???????????????!
          </span>
        )}
      </PlaceSummaryInformation>
      {/* Desccription  */}
      <DescriptionContainer>
        <h3 style={{ fontSize: "13px", margin: "3px 0", lineHeight: "18px" }}>
          {placeData?.placeDetail?.title}
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "18px" }}>
          {" "}
          {placeData?.placeDetail.description}
        </p>
      </DescriptionContainer>

      <AlbumnDescription>
        <strong>{placeData?.name || name} ????????????</strong>{" "}
        <span>{placeData?.subImages ? placeData?.subImages.length : "N"}</span>
        <p>????????? ???????????? ???????????????</p>
      </AlbumnDescription>

      {/* SubImages Album  */}
      <GridContainer>
        {placeData?.subImages?.map((imageUrl, index) => {
          if (index < 5) {
            return (
              <GridPic
                key={index}
                src={optimizeImage(imageUrl, { width: 112, height: 112 })}
                onClick={() =>
                  history.push(`/image/${index}`, {
                    payload: {
                      imageUrls: placeData?.subImages,
                    },
                  })
                }
              />
            );
          } else if (index == 5) {
            return (
              <OverlayContainer
                key={imageUrl}
                onClick={() =>
                  history.push(`/image/${index}`, {
                    payload: {
                      imageUrls: placeData?.subImages,
                    },
                  })
                }
              >
                <GridPic
                  src={optimizeImage(imageUrl, { width: 112, height: 112 })}
                />
                <Overlay />
                <OverlayText>
                  {placeData?.subImages.length - 6 > 0 && (
                    <>
                      +{placeData?.subImages.length - 6}
                      <br />
                    </>
                  )}
                  ?????????
                </OverlayText>
              </OverlayContainer>
            );
          }
        })}
      </GridContainer>
      {/* Participants */}
      <Section id="participant">
        <PrimaryText>
          ?????? {placeData?.participantsCount || participantsCount}?????? ????????????
          ???????????????!
        </PrimaryText>
        <DescriptionText>
          <b>???????????? ??????</b>?????? ????????? ???????????? ????????? ??????????????????!
        </DescriptionText>
        <AvartarImgContainerParticipant>
          {(placeData?.participants || participants)?.map((participant) => (
            <Avatar
              key={participant.userId}
              profileImgUrl={participant.profileImgUrl}
              width="46px"
              rightOffset={"8px"}
              onClick={() => {
                if (placeData?.isParticipating || isParticipating) {
                  history.push(`${routes.userProfile}`, {
                    id: participant.userId,
                  });
                } else if (!isClosed) {
                  history.push(
                    `/participants-list/${encodeUrlSlug(
                      placeData?.name || name,
                    )}`,
                    {
                      placeId,
                    },
                  );
                }
              }}
            />
          ))}
        </AvartarImgContainerParticipant>
      </Section>
      {/* ?????? ?????? */}
      <Section>
        <PrimaryText>#????????????</PrimaryText>
        <Row>
          <span className="bold">??????</span>
          <span>
            {placeData?.startDateFromNow &&
              StartDateFromNowToString(placeData.startDateFromNow)}{" "}
          </span>
        </Row>
        <Row>
          <span className="bold">??????</span>
          <span>{placeData?.placeDetail.detailAddress}</span>
        </Row>

        <Row>
          <span className="bold">??????</span>
          <span>{placeData?.recommendation}</span>
        </Row>

        <Row>
          <span className="bold">?????????</span>
          <span>??????</span>
        </Row>

        <Row>
          <span className="Info">
            <strong>?????????? ????</strong> ?????? ???????????? ????????? ????????????{" "}
            <strong>?????? ?????? ????????????</strong>??? ??????????????????! <br />
            (?????? ?????? ????????? ?????? ????????? ????????? ??? ?????????)
          </span>
        </Row>
      </Section>
      {/* Kakao Map */}
      <Section style={{ marginTop: "25px", border: "none" }}>
        <PrimaryText>???????????? ???</PrimaryText>
        <DirText
          onClick={() => {
            if (!placeData) return;
            window.location.href = placeData.placeDetail.detailLink;
          }}
        >
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            color={colors.LightGray}
            size="lg"
            style={{ marginRight: "4px" }}
          />
          {placeData?.placeDetail.detailAddress}
        </DirText>
        <div
          id="map"
          onClick={() =>
            window.open(placeData?.placeDetail?.detailLink, "_blank")
          }
          style={{
            width: "295px",
            height: "175px",
            marginTop: "17px",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "10px",
          }}
        />
      </Section>
      {/* Reservation Button */}
      {/* ?????? ?????? ??????.. Link ??? ?????? ??????????????? ???????????? */}
      {placeData && CalculateDDay(placeData.startDateAt) >= 0 && (
        <BottomFixedIndicationContainer>
          <BottomIndication>
            <b>
              D-
              {CalculateDDay(placeData?.startDateAt || startDateAt) === 0
                ? "DAY"
                : CalculateDDay(placeData?.startDateAt || startDateAt)}
            </b>
            {CalculateCloseDay(placeData?.startDateAt || startDateAt)} ????????????
            ???????????? ???????????????!
          </BottomIndication>
        </BottomFixedIndicationContainer>
      )}
      <BottomFixedButtonContainer>
        <CTABottomFixedButtoninContainer
          onClick={CTAClickedHandler}
          isParticipating={placeData?.isParticipating || isParticipating}
          isFinal={isFinal}
          isClosed={isClosed}
          showCancelBtn={showCancelBtn}
          disabled={
            ((placeData?.isParticipating || isParticipating) &&
              !showCancelBtn) ||
            isClosed
          }
        >
          <p>
            {showCancelBtn
              ? "?????? ????????????"
              : isClosed
              ? "?????? ????????????"
              : placeData?.isParticipating || isParticipating
              ? "?????? ?????? ????????? ???????????????"
              : isFinal
              ? "?????? ??????! ???????????? ????????????"
              : "???????????? ????????????"}
          </p>
        </CTABottomFixedButtoninContainer>
      </BottomFixedButtonContainer>
      <SpaceForNavBar />
      {isCancleBtnClicked && (
        <Modal
          isClose={!isCancleBtnClicked}
          onClose={() => setIsCancleBtnClicked((prev) => !prev)}
        >
          <ReservationModalWrapper>
            <h1>????????? ?????? ??????????????????????</h1>
            <span>
              1. ?????? ?????? ????????? ????????? ?????? <strong>??????/????????????</strong>???
              ?????? ????????? ????????? ????????? ?????? ?????????.
              <br />
              <br />
              2. ?????? ????????? <strong>12?????? ???</strong>??? ????????? ?????? ?????????
              ????????? ?????? ??????????????? ????????? ????????? ????????????.
              <br />
              <br />
              3. ???????????? ???????????? ????????? ???????????? ???????????????{" "}
              <strong>????????? ??? ?????????????????? ?????? ??????</strong>??? ???????????????
              ???????????????:)
            </span>

            <MainBtn
              onClick={() =>
                history.push(routes.cancelReservation, {
                  placeId,
                })
              }
              style={{ width: "90%" }}
            >
              ????????????
            </MainBtn>
            <p
              onClick={() => setIsCancleBtnClicked(false)}
              className="cancleBtn"
            >
              ????????????
            </p>
          </ReservationModalWrapper>
        </Modal>
      )}
    </Container>
  );
}

const BackContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
  z-index: 100;
`;

const OverlayContainer = styled.div`
  width: 112px;
  height: 112px;
  padding: 0px;
  position: relative;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: absolute;
  background-color: ${colors.Black};
  width: 100%;
  height: 100%;
  opacity: 0.5;
  border-radius: 5px;
  justify-content: center;
  display: flex;
  align-items: center;
  bottom: 50%;
  transform: translateY(50%);
`;

export const OverlayText = styled.div`
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  font-weight: 800;
  font-size: 14px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const FlexSpaceBetween = styled(FlexDiv)`
  justify-content: space-between;
`;

const ViewCount = styled.span`
  color: #fff;
  font-size: 9px;
`;

const CTABottomFixedButtoninContainer = styled(BottomFixedButtoninContainer)<{
  isParticipating: boolean;
  isFinal: boolean;
  isClosed: boolean;
  showCancelBtn: boolean;
}>`
  background: ${(props) =>
    props.isParticipating || props.isClosed || props.showCancelBtn
      ? "#A7B0C0"
      : props.isFinal
      ? "#FF2343"
      : "#18a0fb"};
`;

const DescriptionContainer = styled.div`
  margin: 23px 0 50px;
  width: 345px;
  margin-left: auto;
  margin-right: auto;
  font-size: 12px;
  line-height: 150%;
  position: relative;
  font-size: 12px;
  line-height: 18px;
  h3 {
    font-weight: 700;
    color: #6f7789;
  }
  p {
    color: ${colors.MidGray};
    white-space: pre-line;
  }
`;

const BackButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  margin-bottom: 5px;
  background: rgba(25, 27, 26, 0.08);
  backdrop-filter: blur(24px);
  border-radius: 50%;
  cursor: pointer;
`;

const SHeaderTextHeading = styled.h3`
  padding-bottom: 5px;
  font-size: 24px;
  font-weight: 800;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4px;
  background-color: #fff;
  color: #444;
  padding: 16px;
  padding-top: 10px;
`;

const GridPic = styled.img`
  width: 112px;
  height: 112px;
  object-fit: cover;
  cursor: pointer;
`;

export const Section = styled.div`
  margin: 0 auto;
  padding: 31px 20px 20px;
  line-height: 19px;
  border-bottom: 0.5px solid #e7ecf3;
`;

export const PrimaryText = styled.p`
  color: #18a0fb;
  font-weight: 700;
  font-size: 15px;
`;

const DescriptionText = styled.p`
  color: #8c94a4;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  margin-top: 10px;
  b {
    font-weight: bold;
  }
`;

const PParticipantContainer = styled.div`
  margin-top: 7px;
`;

const PParticipant = styled.span<{ MarginLeft?: string }>`
  margin-left: ${(props) => props.MarginLeft || "0"};
  color: #6f7789;
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
`;

const AvartarImgContainerParticipant = styled.div<{
  isParticipating?: boolean;
}>`
  margin-top: 15px;
  /* filter: ${(props) => !props.isParticipating && "blur(1px)"}; */
  transform: translate(-3px, 0);
`;

const DirText = styled.p`
  color: ${colors.LightGray};
  margin: 14px 0;
  margin-left: auto;
  margin-right: auto;
  line-height: 150%;
  font-size: 15px;
  cursor: pointer;
`;

const TempToBeDeleted = styled.div`
  position: absolute;
  width: 375px;
  height: 230px;

  background: linear-gradient(
    180deg,
    rgba(8, 8, 8, 0) 0%,
    rgba(8, 8, 8, 0.1) 23.94%,
    rgba(8, 8, 8, 0.24) 34.55%,
    #191b1a 110%
  );
  border-radius: 0px;

  position: absolute;
  top: 0;
`;

const SHeaderCategoryIndicator = styled.div`
  background: #18a0fb;
  color: #fff;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 500;
  line-height: 13px;
  padding: 5px 10px;
  margin: 12px 0;
  display: inline-block;
  & + & {
    margin-left: 6px;
  }
`;

const SHeaderTextDescription = styled.p`
  font-size: 11px;
  font-weight: 500;
  line-height: 150%;
`;

const SHeader = styled.div`
  height: 217px;
  position: relative;
`;

const SHeaderPic = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
`;

const HeaderText = styled.div`
  color: #fff;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 335px;
  h3,
  p {
    color: #fff;
  }
`;

const PlaceSummaryInformation = styled.div`
  background-color: #dbedff;
  color: #18a0fb;
  padding: 15px 20px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 500;
  border-radius: 5px 5px 0 0;
  transform: translate(0, -5px);
  span {
    font-weight: 700;
    color: #18a0fb;
  }
`;

const BottomIndication = styled.div`
  background-color: #dbedff;
  color: #18a0fb;
  width: 100%;
  max-width: 375px;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  font-size: 12px;
  b {
    font-weight: bold;
    margin-right: 5px;
  }
`;

export const Row = styled.div`
  display: flex;
  span {
    color: #6f7789;
    font-size: 12px;
    line-height: 19px;
  }
  .bold {
    font-weight: 700;
    margin-right: 8px;
  }
  .Top01 {
    font-size: 13px;
    line-height: 16px;
    color: #8c94a4;
    margin: 12px 0 10px;
  }
  .Info {
    color: #18a0fb;
    margin: 18px 0;
  }
  strong {
    font-weight: 700;
  }
`;

const AlbumnDescription = styled.section`
  margin: 0 auto;
  width: 345px;
  strong {
    color: #505050;
    font-weight: 500;
    line-height: 18px;
  }
  span {
    margin-left: 5px;
    color: #18a0fb;
    font-weight: bold;
  }
  p {
    margin-top: 7px;
    color: #8c94a4;
    font-size: 13px;
    line-height: 16px;
  }
`;
