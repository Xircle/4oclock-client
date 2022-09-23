import { faBars, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { seeAllCategory } from "../../../lib/api/seeAllCategory";
import { CategoryData } from "../../../lib/api/types";
import { colors, Container } from "../../../styles/styles";

function V2LandingPage() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>([]);

  const { data: categoryData } = useQuery<CategoryData[] | undefined>(
    ["place-detail"],
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

  useEffect(() => {
    if (categoryData !== undefined && categoryData.length > 0) {
      setCategories(categoryData);
    }
    console.log(categoryData);
  }, [categoryData]);

  return (
    <SContainer>
      <Header>
        <HeaderItem
          onClick={() => {
            setDrawerOpened(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} color={colors.Black} size="2x" />
        </HeaderItem>
        <HeaderItem>로그인</HeaderItem>
      </Header>
      <Body>
        <FilterContainer>
          {categories.map((item) => {
            return <FilterOption key={item.id}>{item.name}</FilterOption>;
          })}
        </FilterContainer>
      </Body>
      <Drawer open={drawerOpened} onClose={() => setDrawerOpened(false)}>
        <DrawerItem>내 지원서 보기</DrawerItem>
        <DrawerItem>인스타 후기보기</DrawerItem>
        <DrawerItem>문의하기</DrawerItem>
      </Drawer>
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

const DrawerItem = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  cursor: pointer;
`;

const Header = styled.div`
  position: sticky;
  width: 375px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  top: 0px;
  -webkit-box-shadow: 0px 12px 13px -9px rgba(0, 0, 0, 0.43);
  box-shadow: 0px 12px 13px -9px rgba(0, 0, 0, 0.43);
`;

const HeaderItem = styled.div`
  align-self: center;
  cursor: pointer;
`;

export default V2LandingPage;
