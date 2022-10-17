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
import { Container } from "../../../styles/styles";

enum DrawerType {
  Category = "Category",
  Time = "Time",
  Age = "Age",
}

function V2LandingPage() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [refetchInitialized, setRefetchInitialized] = useState(false);
  const [drawerText, setDrawerText] = useState<DrawerType>(DrawerType.Category);
  const container = useRef<HTMLDivElement>(null);
  const [refilterCount, setRefeilterCount] = useState(0);
  const [dayData, setDayData] = useState<TimeData[]>(ITimeData);
  const [ageData, setAgeData] = useState<AgeData[]>(IAgeData);
  const { mutateAsync: mutateUserData, isLoading: isFetching } =
    useMutation(getUser);

  const fetchNewUserData = async () => {
    if (storage.getItem(CURRENT_USER)?.token) {
      const userData = await mutateUserData();

      const temp = storage.getItem(CURRENT_USER);
      temp.profile.role = userData?.accountType;
      temp.username = userData?.username;
      temp.profile.thumbnail = userData?.profileImageUrl;
      storage.setItem(CURRENT_USER, temp!);
    }
  };

  useEffect(() => {
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
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const {
    data: teamData,
    isLoading: teamDataLoading,
    hasNextPage: hasNextPageTeam,
    fetchNextPage: fetchNextPageTeam,
  } = useInfiniteQuery(
    ["teams", categories, dayData, ageData, refilterCount],
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
      if (window.pageYOffset + window.innerHeight > clientHeight - 100) {
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
      setCategories([]);
      categoryData.map((category) => {
        setCategories((prev) => [
          ...prev,
          { id: category.id, name: category.name, selected: true },
        ]);
      });
    }
  }, [categoryData]);

  useEffect(() => {
    if (categories && dayData && ageData) {
      setRefeilterCount(refilterCount + 1);
      window.addEventListener("scroll", OnScroll);
      // v
    }
  }, [categories, dayData, ageData]);

  const openDrawer = () => {
    setDrawerOpened(true);
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

  return (
    <SContainer ref={container}>
      <V2HeaderC />
      <Drawer
        PaperProps={{
          style: {
            width: 375,
            height: 500,
            justifyContent: "flex-start",
            padding: 20,
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
        onClose={() => setDrawerOpened(false)}
        anchor="bottom"
      >
        <DrawerTitle>{drawerText}</DrawerTitle>
        {drawerText === DrawerType.Category
          ? categories.map((item, index) => {
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
          : drawerText === DrawerType.Time
          ? dayData.map((item, index) => {
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
          : ageData.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={item.selected}
                      onChange={() => {
                        let temp = [...ageData];
                        temp[index].selected = !temp[index].selected;
                        setAgeData(temp);
                      }}
                    />
                  }
                  label={ageData[index].title}
                />
              );
            })}
      </Drawer>
      <InquiryButton onClick={InquiryCTA}>케빈에게 문의하기</InquiryButton>
      <InstructionContainer>
        <InstructionHeading>✅신청 step</InstructionHeading>
        <InstructionText>
          0. 들어가고 싶은 정모클럽 나이대,날짜,테마 선택하기{"\n"}1.정모클럽
          2-3개 신청하기{"\n"}2.리더의 승인 대기 하기{`\n`}3.(중요)my page 에서
          승인된 모임 오카방 들어가기
        </InstructionText>
      </InstructionContainer>
      <Body>
        <FilterContainer>
          <FilterOption onClick={openTimeDrawer}>시간</FilterOption>
          <FilterOption onClick={openCategoryDrawer}>테마</FilterOption>
          <FilterOption onClick={openAgeDrawer}>나이</FilterOption>
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
                    min_age={team.min_age}
                    max_age={team.max_age}
                    image={team.images?.[0]}
                    leader_id={team.leader_id}
                    leader_image={team.leader_image}
                    leader_username={team.leader_username}
                    meeting_day={team.meeting_day}
                    meeting_hour={team.meeting_hour}
                    description={team.description}
                    category_name={team.category_name}
                  />
                );
              })}
        </FeedContainer>
      </Body>
    </SContainer>
  );
}

const InstructionContainer = styled.div`
  background: #dbedff;
  padding: 6px;
`;

const InstructionHeading = styled.div`
  margin-left: auto;
  margin-right: auto;
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

  color: #505050;
  margin-left: auto;
  margin-right: auto;
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

const DrawerTitle = styled.div``;

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
  background-color: #fff8d1;
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
`;

const SContainer = styled(Container)`
  min-height: 100vh;
`;

const Body = styled.div`
  padding-top: 30px;
`;

export default V2LandingPage;
