import { Checkbox, Drawer, FormControlLabel } from "@material-ui/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { CURRENT_USER } from "../../../components/shared/constants";
import TeamFeedRenderItem from "../../../components/V2/Team/TeamFeedRenderItem";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import { seeTeamsWithFilter } from "../../../lib/api/getTeamsWithFilter";
import { getUser } from "../../../lib/api/getUser";
import { seeAllCategory } from "../../../lib/api/seeAllCategory";
import { CategoryData } from "../../../lib/api/types";
import storage from "../../../lib/storage";
import {
  AgeData,
  IAgeData,
  InquiryCTA,
  ITimeData,
  TimeData,
} from "../../../lib/v2/utils";
import { colors, Container, MainBtn } from "../../../styles/styles";
import { isSamsungBrowser } from "react-device-detect";
import Modal from "../../../components/UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import Footer from "../../../components/footer/Footer";
import { useHistory } from "react-router-dom";
import routes from "../../../routes";
import { verifyByCode } from "../../../lib/api/verifyByCode";

enum DrawerType {
  Category = "선호하는 정모 테마을 선택해주세요",
  Time = "참여 가능한 정모 날짜를 선택해주세요",
  Age = "당신의 나이대를 선택해주세요",
}

function V2LandingPage() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerText, setDrawerText] = useState<DrawerType>(DrawerType.Category);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [refetchInitialized, setRefetchInitialized] = useState(false);

  const container = useRef<HTMLDivElement>(null);
  const [refilterCount, setRefeilterCount] = useState(0);
  const [dayData, setDayData] = useState<TimeData[]>(ITimeData);
  const [ageData, setAgeData] = useState<AgeData[]>([]);
  const [isSamsungBrowserBool, setIsSamsungBrowserBool] = useState(false);
  const [isYkClub, setIsYkClub] = useState<boolean | undefined>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [codeModal, setCodeModal] = useState<boolean>(false);
  const history = useHistory();

  const { mutateAsync: mutateUserData, isLoading: isFetching } =
    useMutation(getUser);

  const { mutateAsync: mutateVerifyByCode, isLoading: verifyByCodeIsLoading } =
    useMutation(verifyByCode);

  const fetchNewUserData = async () => {
    if (storage.getItem(CURRENT_USER)?.token) {
      const userData = await mutateUserData();

      const temp = storage.getItem(CURRENT_USER);

      temp.profile.isYkClub = userData?.isYkClub;
      temp.profile.role = userData?.accountType;
      temp.username = userData?.username;
      temp.profile.thumbnail = userData?.profileImageUrl;
      temp.profile.gender = userData?.gender;
      temp.profile.age = userData?.age;
      storage.setItem(CURRENT_USER, temp!);
      setIsYkClub(userData?.isYkClub);
      if (userData?.username) {
        setLoggedIn(true);
      }
    }
  };

  const VerifyCTA = async (code: string) => {
    try {
      const data = await mutateVerifyByCode(code);
      await fetchNewUserData();
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (isSamsungBrowser) setIsSamsungBrowserBool(true);
    let mounted = true;
    if (mounted) {
      fetchNewUserData();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const { data: categoryData } = useQuery<CategoryData[] | undefined>(
    ["categories"],
    () => seeAllCategory(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const {
    data: teamData,
    isLoading: teamDataLoading,
    refetch: teamDataRefetch,
    isFetchingNextPage: teamDataFetching,
    hasNextPage: hasNextPageTeam,
    fetchNextPage: fetchNextPageTeam,
    isFetching: isFetchingTeam,
  } = useInfiniteQuery(
    ["teams"],
    // @ts-ignore
    ({ pageParam }) =>
      seeTeamsWithFilter(categories, dayData, ageData, pageParam),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.meta.page + 1;
        return nextPage <= currentPage.meta.totalPages ? nextPage : null;
      },
      refetchOnWindowFocus: false,
    },
  );

  const OnScroll = useCallback((event) => {
    if (container.current) {
      const { clientHeight } = container.current;

      if (window.pageYOffset + window.innerHeight > clientHeight - 200) {
        fetchNextPageTeam();
      }
    }
  }, []);

  useEffect(() => {
    if (hasNextPageTeam === false) {
      window.removeEventListener("scroll", OnScroll);
    }

    if (!refetchInitialized && hasNextPageTeam === true) {
      window.addEventListener("scroll", OnScroll);
      setRefetchInitialized(true);
    }
  }, [hasNextPageTeam]);

  useEffect(() => {
    if (categoryData !== undefined && categoryData.length > 0) {
      const temp: CategoryData[] = [];
      categoryData.map((category) => {
        temp.push({ id: category.id, name: category.name, selected: true });
      });
      setCategories(temp);
    }
  }, [categoryData]);

  const filterReset = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (categories && dayData && ageData) {
      setRefeilterCount(refilterCount + 1);
      window.addEventListener("scroll", OnScroll);
    }
  }, [categories, dayData, ageData]);

  const openDrawer = () => {
    setDrawerOpened(true);
  };

  const closeDrawer = () => {
    teamDataRefetch();
    setDrawerOpened(false);
  };

  const openCategoryDrawer = () => {
    setDrawerText(DrawerType.Category);
    setDrawerOpened(true);
  };

  const openTimeDrawer = () => {
    setDrawerText(DrawerType.Time);
    setDrawerOpened(true);
  };

  const openAgeDrawer = () => {
    setDrawerText(DrawerType.Age);
    setDrawerOpened(true);
  };

  const visitMypage = () => {
    if (storage.getItem(CURRENT_USER)?.profile.role === "Owner") {
      history.push(routes.v2LeaderPage);
    } else {
      history.push(routes.v2MyPage);
    }
  };

  return (
    <SContainer ref={container}>
      {isSamsungBrowserBool && (
        <Modal
          isClose={!isSamsungBrowserBool}
          onClose={() => setIsSamsungBrowserBool((prev) => !prev)}
        >
          <ModalWrapper>
            <h1>크롬 or 사파리로 접속해주세요!</h1>
            <p>
              삼성 브라우저에서 회원가입이 잘되지 않는 이슈를 발견했어요!
              <br />
              <br />
              원활한 접속을 위해 크롬 or 사파리로 접속해주세요
            </p>
            <MainBtn
              onClick={() => setIsSamsungBrowserBool(false)}
              style={{ width: "90%" }}
            >
              알겠습니다
            </MainBtn>
          </ModalWrapper>
        </Modal>
      )}
      {codeModal && (
        <Modal
          isClose={!codeModal}
          onClose={() => setCodeModal((prev) => !prev)}
        >
          <ModalWrapper>
            <h1>크롬 or 사파리로 접속해주세요!</h1>
            <p>
              삼성 브라우저에서 회원가입이 잘되지 않는 이슈를 발견했어요!
              <br />
              <br />
              원활한 접속을 위해 크롬 or 사파리로 접속해주세요
            </p>
            <MainBtn
              onClick={() => setCodeModal(false)}
              style={{ width: "90%" }}
            >
              알겠습니다
            </MainBtn>
          </ModalWrapper>
        </Modal>
      )}
      <V2HeaderC />
      <Drawer
        PaperProps={{
          style: {
            width: 375,
            minHeight: 500,
            justifyContent: "flex-start",
            paddingTop: 20,
            paddingBottom: 20,
            color: "#505050",
            fontWeight: "bold",
            fontSize: 19,
          },
        }}
        ModalProps={{
          style: {},
        }}
        SlideProps={{
          style: {
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}
        open={drawerOpened}
        onClose={closeDrawer}
        anchor="bottom"
      >
        <DrawerTitle>{drawerText}</DrawerTitle>

        <Info1>중복선택 가능*</Info1>
        {drawerText === DrawerType.Time ? (
          <DrawerAlert>※이번 기수는 목금토일 정모만 신청 가능해요</DrawerAlert>
        ) : (
          <></>
        )}
        <Info2>
          ✅ 선택한 내용을 토대로
          <br />
          참여 가능한 정모가 보여!
          <br />
          마음에 드는 모임에 신청하기!
        </Info2>
        {drawerText === DrawerType.Category ? (
          categories.map((item, index) => {
            return (
              <FormControlLabel
                key={item.id}
                control={
                  <Checkbox
                    checked={item.selected}
                    onChange={() => {
                      let temp = [...categories];
                      temp[index].selected = !temp[index].selected;
                      setCategories(temp);
                    }}
                  />
                }
                label={categories[index].name}
              />
            );
          })
        ) : drawerText === DrawerType.Time ? (
          dayData.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={item.selected}
                    onChange={() => {
                      let temp = [...dayData];
                      temp[index].selected = !temp[index].selected;
                      setDayData(temp);
                    }}
                  />
                }
                label={dayData[index].day}
              />
            );
          })
        ) : (
          <FormControlLabel
            control={
              <Checkbox
                checked={ageData?.length > 0}
                onChange={() => {
                  if (ageData?.length === 0) {
                    const age = storage.getItem(CURRENT_USER).profile.age;
                    const gender = storage.getItem(CURRENT_USER).profile.gender;
                    setAgeData([
                      {
                        title: "my age only",
                        maleMinAge: gender === "Male" ? age : undefined,
                        maleMaxAge: gender === "Male" ? age : undefined,
                        femaleMinAge: gender === "Female" ? age : undefined,
                        femaleMaxAge: gender === "Female" ? age : undefined,
                        selected: true,
                      },
                    ]);
                  } else {
                    setAgeData([]);
                  }
                }}
              />
            }
            label={"내 나이만 보기"}
          />
        )}
        <DrawerWhiteSpace />
        <DrawerButton onClick={closeDrawer}>적용하기</DrawerButton>
      </Drawer>
      <ButtonContainer>
        <InquiryButton onClick={InquiryCTA}>케빈에게 문의하기</InquiryButton>
        {isYkClub === false && (
          <InquiryButton onClick={() => setCodeModal(true)}>
            활동코드 입력하기
          </InquiryButton>
        )}
      </ButtonContainer>
      <InstructionContainer>
        <InstructionHeading>✅신청 step</InstructionHeading>
        <InstructionText>
          0. 들어가고 싶은 정모클럽 <b>나이대,날짜,테마</b> 선택하기
          <br />
          1.정모클럽 <b>4-5개</b> 신청하기
          <br />
          2.리더의 승인 대기 하기
          <br />
          3.<b style={{ color: "#FF0000" }}>(중요)</b>my page 에서 승인된 모임
          확인하기
        </InstructionText>
      </InstructionContainer>
      <Body>
        <FilterContainer>
          <FilterOption onClick={openTimeDrawer}>
            시간
            <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 8 }} />
          </FilterOption>
          <FilterOption onClick={openCategoryDrawer}>
            테마
            <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 8 }} />
          </FilterOption>
          <FilterOption onClick={openAgeDrawer}>
            나이
            <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: 8 }} />
          </FilterOption>
          <ResetButton onClick={filterReset}>필터링 제거</ResetButton>
        </FilterContainer>
        <FeedContainer>
          {!teamDataLoading &&
            teamData?.pages
              ?.map((page) => page?.teams)
              .flat()
              .map((team) => {
                return (
                  <TeamFeedRenderItem
                    id={team.id}
                    key={team.id}
                    name={team.name}
                    male_min_age={team.male_min_age}
                    male_max_age={team.male_max_age}
                    female_min_age={team.female_min_age}
                    female_max_age={team.female_max_age}
                    image={team.images?.[0]}
                    leader_id={team.leader_id}
                    leader_image={team.leader_image}
                    leader_username={team.leader_username}
                    meeting_day={team.meeting_day}
                    meeting_hour={team.meeting_hour}
                    description={team.description}
                    category_name={team.category_name}
                    applyCount={team.applyCount}
                    approveCount={team.approveCount}
                    maxParticipant={team.maxParticipant}
                    is_closed={team.is_closed}
                  />
                );
              })}
        </FeedContainer>
      </Body>
      {isFetchingTeam && (
        <ClipLoaderWrapper>
          <ClipLoader
            loading={isFetchingTeam}
            color={colors.MidBlue}
            css={{
              name: "width",
              styles: "border-width: 4px; z-index: 999;",
            }}
            size={30}
          />
        </ClipLoaderWrapper>
      )}

      <Footer />
    </SContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClipLoaderWrapper = styled.div`
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResetButton = styled.div`
  cursor: pointer;
  display: inline-block;
  color: #505050;
  font-weight: 500;
  font-size: 13px;
`;

const DrawerWhiteSpace = styled.div`
  width: 100%;
  height: 80px;
`;

const DrawerButton = styled.div`
  position: absolute;
  bottom: 30px;
  cursor: pointer;
  width: 333px;
  height: 48px;
  background-color: rgba(33, 225, 156, 0.62);
  border-radius: 5px;
  color: #505050;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info1 = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #505050;
  margin-top: 8px;
`;

const Info2 = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #505050;
  padding: 21px;
  background: #e7ecf3;
  width: 100%;
`;

const InstructionContainer = styled.div`
  background: #dbedff;
  padding: 6px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InstructionHeading = styled.div`
  color: #505050;
  font-weight: 700;
  font-size: 13px;
  line-height: 18px;
`;

const InstructionText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  /* or 143% */
  margin-top: 8px;
  margin-bottom: 15px;

  color: #505050;
  b {
    font-weight: 600;
  }
`;

const InquiryButton = styled.div`
  margin-left: auto;
  margin-right: auto;
  background: rgba(33, 225, 156, 0.33);
  border-radius: 10px;
  margin-top: 15px;
  margin-bottom: 10px;
  width: 175px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 18px;
  color: #505050;
  cursor: pointer;
`;

const DrawerTitle = styled.div`
  color: #505050;
  font-weight: 700;
  font-size: 19px;
  line-height: 24px;
`;

const FeedContainer = styled.div`
  width: 100%;
`;

const FilterContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

const FilterOption = styled.span`
  margin: 10px;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  background-color: #fff8d1;
  padding-left: 15px;
  padding-right: 9px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
  color: #505050;
  position: relative;
`;

const SContainer = styled(Container)`
  min-height: 100vh;
`;

const Body = styled.div`
  padding-top: 30px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  padding: 10px 40px;
  h1 {
    color: #12121d;
    font-weight: bold;
    font-size: 24px;
    line-height: 28px;
  }
  p {
    color: #18a0fb;
    font-size: 15px;
    line-height: 18px;
    font-weight: 500;
  }
`;

const DrawerAlert = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #ff0000;
`;

export default V2LandingPage;
