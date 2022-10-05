import { faBars, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@material-ui/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TeamFeedRenderItem from "../../../components/V2/Team/TeamFeedRenderItem";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import { seeTeamsWithFilter } from "../../../lib/api/getTeamsWithFilter";
import { seeAllCategory } from "../../../lib/api/seeAllCategory";
import { CategoryData } from "../../../lib/api/types";
import { Container } from "../../../styles/styles";

interface ClubTime {
  day: number;
  hour: number;
  minute: number;
}

function V2LandingPage() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [refetchInitialized, setRefetchInitialized] = useState(false);
  const container = useRef<HTMLDivElement>(null);

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
    ["teams", categories],
    // @ts-ignore
    ({ pageParam = 0 }) => seeTeamsWithFilter(categories, pageParam),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.meta.page + 1;
        console.log("next: " + nextPage);
        console.log("total : " + currentPage.meta.totalPages);
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
          { id: category.id, name: category.name, isSelected: true },
        ]);
      });
    }
  }, [categoryData]);

  useEffect(() => {
    console.log(teamData);
  }, [teamData]);

  const openDrawer = () => {
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
            justifyContent: "center",
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
        <FilterOption>드로어 1</FilterOption>
      </Drawer>
      <Body>
        <FilterContainer>
          <FilterOption onClick={openDrawer}>시간</FilterOption>
          <FilterOption onClick={openDrawer}>테마</FilterOption>
          <FilterOption onClick={openDrawer}>나이</FilterOption>
        </FilterContainer>
        <FeedContainer>
          {teamData?.pages
            ?.map((page) => page?.teams)
            .flat()
            .map((item) => {
              return (
                <TeamFeedRenderItem
                  key={item.id}
                  name={item.name}
                  min_age={item.min_age}
                  max_age={item.max_age}
                  image={item.images?.[0]}
                  leader_id={item.leader_id}
                  leader_image={item.leader_image}
                  leader_username={item.leader_username}
                  meeting_day={item.meeting_day}
                  meeting_hour={item.meeting_hour}
                  description={item.description}
                />
              );
            })}
        </FeedContainer>
      </Body>
    </SContainer>
  );
}

const FeedContainer = styled.div`
  width: 100%;
`;

const FilterContainer = styled.div`
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
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
