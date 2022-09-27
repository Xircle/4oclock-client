import { faBars, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import V2HeaderC from "../../../components/V2/UI/V2HeaderC";
import { seeTeamsWithFilter } from "../../../lib/api/getTeamsWithFilter";
import { seeAllCategory } from "../../../lib/api/seeAllCategory";
import { CategoryData } from "../../../lib/api/types";
import { Container } from "../../../styles/styles";

function V2LandingPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);

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

  const { data: teamData } = useQuery(["teams"], () => seeTeamsWithFilter(), {
    onError: (err: any) => {
      alert(err);
      return;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (categoryData !== undefined && categoryData.length > 0) {
      setCategories(categoryData);
    }
    console.log(categoryData);
  }, [categoryData]);

  return (
    <SContainer>
      <V2HeaderC />
      <Body>
        <FilterContainer>
          {categories.map((item) => {
            return <FilterOption key={item.id}>{item.name}</FilterOption>;
          })}
        </FilterContainer>
      </Body>
    </SContainer>
  );
}

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
  min-height: 300vh;
  padding-top: 30px;
`;

export default V2LandingPage;
