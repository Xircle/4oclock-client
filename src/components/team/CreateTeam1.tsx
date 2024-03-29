import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Drawer, FormControlLabel, Radio } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { seeAllCategory } from "../../lib/api/seeAllCategory";
import { Area, CategoryData } from "../../lib/api/types";
import { getAreas } from "../../lib/v2/getAreas";
import { BigTextArea, colors, MainBtn, MidInput } from "../../styles/styles";
import Label from "./Label";
import { TeamAction, TeamState } from "./types";

interface Props {
  onNext: () => void;
  state: TeamState;
  dispatch: React.Dispatch<TeamAction>;
}

enum ModalType {
  Time = "Time",
  Age = "Age",
  Category = "Category",
  Area = "Area",
}

export default function CreateTeam1({ onNext, state, dispatch }: Props) {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.Time);
  const [modalTitle, setModalTitle] = useState("");

  const { data: areaData } = useQuery<Area[] | undefined>(
    ["AreaData"],
    () => getAreas(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const { data: categoryData } = useQuery<CategoryData[] | undefined>(
    ["categories"],
    () => seeAllCategory(),
    {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  );

  const openDrawer = () => {
    setDrawerOpened(true);
  };

  const closeDrawer = () => {
    setDrawerOpened(false);
  };

  const openTimeDrawer = () => {
    setModalType(ModalType.Time);
    setModalTitle("요일 및 시간");
    openDrawer();
  };

  const openAgeDrawer = () => {
    setModalType(ModalType.Age);
    setModalTitle("나이대 설정");
    openDrawer();
  };

  const openCategoryDrawer = () => {
    setModalType(ModalType.Category);
    setModalTitle("활동테마");
    openDrawer();
  };

  const openAreaDrawer = () => {
    setModalType(ModalType.Area);
    setModalTitle("주 활동지역");
    openDrawer();
  };

  const nextDisabled: boolean =
    state.name?.length > 0 &&
    state.meeting_day !== undefined &&
    state.meeting_hour !== undefined &&
    state.leaderIntro?.length > 0 &&
    state.maleMaxAge !== undefined &&
    state.maleMinAge !== undefined &&
    state.femaleMinAge !== undefined &&
    state.categoryId &&
    state.femaleMaxAge !== undefined
      ? false
      : true;

  const TimeComponent = () => {
    return (
      <ModalContentContainer>
        <ModalText>요일</ModalText>
        <ModalSelectContainer>
          <ModalSelect
            selected={state.meeting_day === 0}
            onClick={() => {
              dispatch({ type: "setMeeting_day", payload: 0 });
            }}
          >
            일요일
          </ModalSelect>
          <ModalSelect
            selected={state.meeting_day === 4}
            onClick={() => {
              dispatch({ type: "setMeeting_day", payload: 4 });
            }}
          >
            목요일
          </ModalSelect>
          <ModalSelect
            selected={state.meeting_day === 5}
            onClick={() => {
              dispatch({ type: "setMeeting_day", payload: 5 });
            }}
          >
            금요일
          </ModalSelect>
          <ModalSelect
            selected={state.meeting_day === 6}
            onClick={() => {
              dispatch({ type: "setMeeting_day", payload: 6 });
            }}
          >
            토요일
          </ModalSelect>
        </ModalSelectContainer>
        <ModalText>시간</ModalText>
        <ModalSelectContainer>
          <ModalSelect
            selected={state.meeting_hour === 14}
            onClick={() => {
              dispatch({ type: "setMeeting_hour", payload: 14 });
            }}
          >
            2시
          </ModalSelect>
          <ModalSelect
            selected={state.meeting_hour === 18}
            onClick={() => {
              dispatch({ type: "setMeeting_hour", payload: 18 });
            }}
          >
            6시
          </ModalSelect>
        </ModalSelectContainer>
      </ModalContentContainer>
    );
  };

  const CategoryComponent = () => {
    return (
      <NonFlexWrapper>
        {categoryData?.map((item, index) => {
          return (
            <div>
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    checked={state.categoryId === item.id}
                    onChange={() => {
                      dispatch({
                        type: "setCategoryId",
                        payload: item.id,
                      });
                    }}
                  />
                }
                label={item.name}
              />
            </div>
          );
        })}
      </NonFlexWrapper>
    );
  };

  const AreaComponent = () => {
    return (
      <NonFlexWrapper>
        {areaData?.map((item, index) => {
          return (
            <div>
              <FormControlLabel
                key={index + "200"}
                control={
                  <Checkbox
                    checked={state.areaIds.includes(item.id)}
                    onChange={() => {
                      if (state.areaIds.includes(item.id)) {
                        dispatch({
                          type: "setAreaIds",
                          payload: state.areaIds.filter(
                            (areaId) => areaId != item.id,
                          ),
                        });
                      } else {
                        dispatch({
                          type: "setAreaIds",
                          payload: [...state.areaIds, item.id],
                        });
                      }
                    }}
                  />
                }
                label={item.name}
              />
            </div>
          );
        })}
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.areaIds.length === 0}
                onChange={() => {
                  dispatch({ type: "setAreaIds", payload: [] });
                }}
              />
            }
            label="상관없음"
          />
        </div>
      </NonFlexWrapper>
    );
  };
  const AgeComponent = () => {
    return (
      <ModalContentContainer>
        <ModalText>남자 최소 나이 (이상)</ModalText>
        <OnelineInput
          placeholder="20"
          type="number"
          value={state.maleMinAge}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setMaleMinAge", payload: Number(e.target.value) })
          }
        />
        <ModalText>남자 최대 나이 (이하)</ModalText>
        <OnelineInput
          placeholder="30"
          type="number"
          value={state.maleMaxAge}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setMaleMaxAge", payload: Number(e.target.value) })
          }
        />
        <ModalText>여자 최소 나이 (이상)</ModalText>
        <OnelineInput
          placeholder="20"
          type="number"
          value={state.femaleMinAge}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setFemaleMinAge",
              payload: Number(e.target.value),
            })
          }
        />
        <ModalText>여자 최대 나이 (이하)</ModalText>
        <OnelineInput
          placeholder="30"
          type="number"
          value={state.femaleMaxAge}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setFemaleMaxAge",
              payload: Number(e.target.value),
            })
          }
        />
      </ModalContentContainer>
    );
  };

  return (
    <Container>
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
        <DrawerTitle>{modalTitle}</DrawerTitle>

        {modalType === ModalType.Time
          ? TimeComponent()
          : modalType === ModalType.Area
          ? AreaComponent()
          : modalType === ModalType.Category
          ? CategoryComponent()
          : modalType === ModalType.Age
          ? AgeComponent()
          : null}

        <DrawerButton onClick={closeDrawer}>적용하기</DrawerButton>
      </Drawer>
      <Label mandatory={true} labelName="클럽 이름" />
      <OnelineInput
        placeholder="개성있는 클럽 이름을 적어주세요!"
        type="text"
        name="clubName"
        // style={
        //   ageError
        //     ? { marginTop: "12px", borderColor: colors.StrongLime }
        //     : { marginTop: "12px" }
        // }
        value={state.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "setName", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.name?.length}/30</CancelWordCount>
      <Label mandatory={true} labelName="만나는 정기모임 요일 및 시간" />
      <DropDownButton onClick={openTimeDrawer}>
        <DropDownText>매주 만나는 요일 및 시간을 골라주세요</DropDownText>
        <FontAwesomeIcon icon={faChevronDown} />
      </DropDownButton>
      <Label mandatory={true} labelName="주 활동지역 (복수 선택 가능)" />
      <DropDownButton onClick={openAreaDrawer}>
        <DropDownText>매주 만나는 장소를 골라주세요</DropDownText>
        <FontAwesomeIcon icon={faChevronDown} />
      </DropDownButton>
      <Label mandatory={true} labelName="클럽 나이대" />
      <DropDownButton onClick={openAgeDrawer}>
        <DropDownText>해당 클럽의 나이대를 골라주세요</DropDownText>
        <FontAwesomeIcon icon={faChevronDown} />
      </DropDownButton>
      <Label mandatory={true} labelName="클럽 활동테마" />
      <DropDownButton onClick={openCategoryDrawer}>
        <DropDownText>해당 클럽의 활동테마를 골라주세요</DropDownText>
        <FontAwesomeIcon icon={faChevronDown} />
      </DropDownButton>
      <Label mandatory={true} labelName="리더 자기소개" />
      <MultilineInput
        name="leaderIntro"
        value={state.leaderIntro}
        placeholder="프렌즈들에게 보여주는 리더의 자기소개를 적어주세요!"
        // style={
        //   bioError
        //     ? {
        //         fontSize: "12px",
        //         lineHeight: "18px",
        //         borderColor: colors.MidBlue,
        //       }
        //     : { fontSize: "12px", lineHeight: "18px" }
        // }
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          dispatch({ type: "setLeaderIntro", payload: e.target.value })
        }
        //onKeyUp={() => Validate()}
      />
      <CancelWordCount>{state.leaderIntro?.length}/30</CancelWordCount>
      <BlankSpace />
      <NextButton type="submit" disabled={nextDisabled} onClick={onNext}>
        다음(1/3)
      </NextButton>
    </Container>
  );
}

const ModalContentContainer = styled.div`
  width: 100%;
  padding: 12px;
`;

const ModalSelectContainer = styled.div`
  display: flex;
`;

const NonFlexWrapper = styled.div`
  margin-top: 10px;
`;

const ModalSelect = styled.div<{ selected: boolean }>`
  color: ${(props) => (props.selected ? "#21E19C" : "#12121D")};
  border: 2px solid;
  border-color: ${(props) => (props.selected ? "#21E19C" : "#12121D")};
  border-radius: 13px;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 3px 10px;
  text-align: center;
`;

const ModalTitle = styled.div``;

const ModalText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #12121d;
`;

const DrawerTitle = styled.div`
  color: #505050;
  font-weight: 700;
  font-size: 19px;
  line-height: 24px;
`;

const Info1 = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #505050;
  margin-top: 8px;
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

export const NextButton = styled(MainBtn)`
  position: fixed;
  z-index: 3;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #21e19c;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  &:disabled {
    background-color: ${colors.LightGray};
    filter: none;
  }
`;

export const BlankSpace = styled.div`
  height: 100px;
`;

export const CancelWordCount = styled.div`
  color: #c4cbd8;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  text-align: end;
`;

export const Container = styled.div``;

export const OnelineInput = styled(MidInput)`
  width: 100%;
`;

export const MultilineInput = styled(BigTextArea)`
  width: 100%;
`;

const DropDownButton = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c4cbd8;
  padding: 10px 8px;
  margin-bottom: 28px;
  border-radius: 8px;
  font-size: 14px;

  color: #c4cbd8;
`;

const DropDownText = styled.div`
  font-size: 14px;

  color: #c4cbd8;
`;
