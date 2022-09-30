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

interface SelectionData {
  id: string;
  name: string;
  isSelected: boolean;
}

function V2LandingPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const container = useRef<HTMLDivElement>(null);
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
    ["teams", categories],
    // @ts-ignore
    ({ pageParam = 0 }) => seeTeamsWithFilter(categories, pageParam),
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.meta.page + 1;
        return nextPage > currentPage.meta.totalPages ? null : nextPage;
      },
      refetchOnWindowFocus: false,
    },
  );

  const loadMoreTeam = () => {
    if (hasNextPageTeam) {
      fetchNextPageTeam();
    }
  };

  const OnScroll = () => {
    if (container.current) {
      const { clientHeight } = container.current;
      if (window.pageYOffset + window.innerHeight > clientHeight - 100) {
        loadMoreTeam();
      }
    }
  };

  useEffect(() => {
    if (hasNextPageTeam) {
      window.addEventListener("scroll", OnScroll);
    } else {
      window.removeEventListener("scroll", OnScroll);
    }
  }, [hasNextPageTeam]);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener("scroll", OnScroll);
    };
  }, []);

  useEffect(() => {
    if (categoryData !== undefined && categoryData.length > 0) {
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

  return (
    <SContainer ref={container}>
      <V2HeaderC />
      <Body>
        <FilterContainer>
          {categories.map((item) => {
            return <FilterOption key={item.id}>{item.name}</FilterOption>;
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
