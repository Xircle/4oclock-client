import { faBars, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TeamFeedRenderItem from "../../../components/V2/Team/TeamFeedRenderItem";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import { seeTeamsWithFilter } from "../../../lib/api/getTeamsWithFilter";
import { seeAllCategory } from "../../../lib/api/seeAllCategory";
import { CategoryData } from "../../../lib/api/types";
import { Container } from "../../../styles/styles";

function V2LandingPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [page, setPage] = useState(1);

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
    ["teams"],
    // @ts-ignore
    ({ pageParam = 0 }) => seeTeamsWithFilter(pageParam),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.meta.page + 1;
        return nextPage > currentPage.meta.totalPages ? null : nextPage;
      },
    },
  );

  const loadMoreTeam = () => {
    if (hasNextPageTeam) {
      fetchNextPageTeam();
    }
  };

  useEffect(() => {
    if (categoryData !== undefined && categoryData.length > 0) {
      setCategories(categoryData);
    }
    console.log(categoryData);
  }, [categoryData]);

  useEffect(() => {
    console.log(teamData);
  }, [teamData]);

  return (
    <SContainer>
      <V2HeaderC />
      <Body>
        <FilterContainer>
          {categories.map((item) => {
            return (
              <FilterOption key={item.id} onClick={loadMoreTeam}>
                {item.name}
              </FilterOption>
            );
          })}
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
                  image={item.images?.[0]}
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

const FilterWrapper = styled.div``;

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
