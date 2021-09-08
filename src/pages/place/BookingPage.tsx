import styled from "styled-components";
import BottomNavBar from "../../components/shared/BottomNavBar";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  Container,
  MainBtn,
  ProcedureHeading,
  SelectionBox,
  SelectionMainText,
  SelectionSubText,
  colors,
  Tag,
} from "../../Styles";

interface Props {}

export default function BookingPage(props: Props) {
  const [isSelected1, setIsSelected1] = useState<boolean>(false);
  const [isSelected2, setIsSelected2] = useState<boolean>(false);
  return (
    <Container>
      <Heading>막걸리 찬가</Heading>
      <SelectionBoxBooking>
        <SelectionMainTextBooking>
          다음주 수요일 오후 4시
          <TagBooking>
            <p>4인 모임</p>
          </TagBooking>
        </SelectionMainTextBooking>
        <SelectionSubTextBooking>5명 참가예정</SelectionSubTextBooking>
        <CheckIcon>
          <FontAwesomeIcon icon={faCheckCircle} color={colors.MidBlue} />
        </CheckIcon>
      </SelectionBoxBooking>
      <SelectionBoxBooking>
        <SelectionMainTextBooking>
          다음주 수요일 오후 4시
          <TagBooking>
            <p>2인 모임</p>
          </TagBooking>
        </SelectionMainTextBooking>
        <SelectionSubTextBooking>7명 참가예정</SelectionSubTextBooking>
        <CheckIcon>
          <FontAwesomeIcon icon={faCircle} color={colors.LightGray} />
        </CheckIcon>
      </SelectionBoxBooking>
      <Instruction>
        <InstructionHeading>식탁 모임은 이렇게 진행돼요!</InstructionHeading>
        <InstructionDetail>
          1. 같은 시간을 신청한 친구들과 4인/2인 랜덤 그룹을 만들어 드려요
          <br />
          2. 모임 당일 단톡을 만들어드려요! 친해지는 시간을 가져보세요
          <br />
          3. 지정된 장소와 시간에 만나서 놀아요.
          <br />
        </InstructionDetail>
        <InstructionDetail>
          단톡이 만들어지기전에 적어주신 전화번호로 연락을 드릴게요!
        </InstructionDetail>
      </Instruction>
      <MainBtnBooking>놀러가기</MainBtnBooking>
      <BottomNavBar selectedItem="feed" />
    </Container>
  );
}

const Heading = styled(ProcedureHeading)`
  padding-top: 50px;
  margin-left: 30px;
`;

const SelectionBoxBooking = styled(SelectionBox)`
  margin-top: 30px;
  position: relative;
  font-size: 24px;
`;

const MainBtnBooking = styled(MainBtn)`
  margin-top: 30px;
  width: 90%;
`;

const SelectionMainTextBooking = styled(SelectionMainText)`
  margin-left: 32px;
  position: relative;
`;

const SelectionSubTextBooking = styled(SelectionSubText)`
  margin-left: 32px;
`;

const Instruction = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  min-height: 200px;
  background-color: #f8fafd;
  border-radius: 5px;
  display: content;
  justify-content: center;
  align-items: center;
  color: ${colors.MidGray};
`;

const InstructionHeading = styled.p`
  font-weight: bold;
  font-size: 13px;
  line-height: 16px;
  margin-left: 12px;
  padding-top: 10px;
`;

const InstructionDetail = styled.p`
  margin-top: 5px;
  font-weight: 500;
  font-size: 11px;
  line-height: 18px;
  letter-spacing: -0.005em;
  margin-left: 12px;
`;

const TagBooking = styled(Tag)`
  top: -11px;
  left: 150px;
  transform: translate(0, 50%);
`;

const CheckIcon = styled.div`
  position: absolute;
  right: 10%;
`;
