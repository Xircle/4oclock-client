import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

interface Colors {
  StrongBlue: string;
  MidBlue: string;
  LightBlue: string;
  MLBlue: string;
  BareBlue: string;
  Black: string;
  MidGray: string;
  LightGray: string;
  BareGray: string;
  Red: string;
}

export const GlobalStyles = createGlobalStyle`
  ${reset}
  html {
    scroll-behavior: smooth;
  }
   p, a, span, h3, h4, div, input, label, textarea {
     font-family: "Spoqa Han Sans Neo", "Spoqa Han Sans JP", sans-serif;
     color: #12121D;
   }
   input, textarea, select, option {
     border: 1px solid #C4CBD8;
     border-radius: 8px;
     font-size: 14px;
     padding: 8px;
     width: 301px;
   }
   input::placeholder, textarea::placeholder, input:disabled, select, option {
      color: #C4CBD8;
   }
   select {
    background-color: white;
    width: 319px;
   }

   input[type=radio] {
     appearance: none;
     width: 24px;
     height: 24px;
     border-radius: 50%;
     margin-top: 0px;
   }
   
   input[type=checkbox] {
    appearance: none;
    border-radius: 50%;
    margin-top: 0px;
   }


   input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`;

export const LinkWithoutUnderLine = styled.a`
  text-decoration: none;
`;

export const colors: Colors = {
  StrongBlue: "#1C43B7",
  MidBlue: "#18A0FB",
  MLBlue: "#EEF7FF",
  LightBlue: "#DBEDFF",
  BareBlue: "#F8FAFD",
  Black: "#12121D",
  MidGray: "#6F7789",
  LightGray: "#A7B0C0",
  BareGray: "#C4CBD8",
  Red: "#FF2343",
};

export const AppContainer = styled.div`
  position: relative;
  width: 375px;
  min-height: 100vh;
  height: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
`;

export const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

export const ProcedureHeading = styled.div`
  font-weight: bold;
  font-size: 26px;
  display: flex;
  align-items: center;
`;

export const MainBtn = styled.button`
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  height: 50px;
  background-color: #18a0fb;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* filter: drop-shadow(16px 16px 20px rgba(75, 88, 208, 0.5)); */
  box-shadow: rgba(75, 88, 208, 0.5) 0px 25px 20px -20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  font-size: 16px;
  p {
    color: white;
  }
  &:disabled {
    background-color: ${colors.LightGray};
  }
`;

export const SelectionBox = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: 90px;
  background-color: white;
  /* justify-content: center; */
  justify-content: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 28px rgba(75, 88, 208, 0.15);
  border-radius: 8px;
`;

export const SelectionMainText = styled.div`
  color: #12121d;
  font-weight: 500;
  font-size: 14px;
`;

export const MainText = styled.div`
  color: #12121d;
  font-weight: 500;
  font-size: 14px;
`;

export const SelectionSubText = styled.div`
  margin-top: 8px;
  color: #a7b0c0;
  font-weight: 400;
  font-size: 13px;
  margin-left: 32px;
`;

export const SubText = styled.div`
  margin-top: 8px;
  color: #a7b0c0;
  font-weight: 400;
  font-size: 15px;
`;
export const SubTextSpan = styled.span`
  margin-top: 8px;
  color: #a7b0c0;
  font-weight: 400;
  font-size: 13px;
`;

export const SpaceForNavBar = styled.div`
  width: 100%;
  height: 100px;
`;

export const BottomNavBarContainer = styled.nav`
  z-index: 30;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50;
  bottom: 0;
  background-color: white;
  filter: drop-shadow(16px 16px 20px rgba(75, 88, 208, 0.15));
`;

export const BottomFixedIndicationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 75px;
  z-index: 1;
`;

export const BottomFixedButtonContainer = styled(BottomNavBarContainer)`
  width: 375px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const BottomFixedButtoninContainer = styled(MainBtn)`
  width: 333px;
`;

export const Tag = styled.span`
  position: absolute;
  background-color: ${colors.MidBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  height: 18px;
  padding: 0px 5px 0px 5px;
  /* top: -5px;
transform: translateX(-8px); */

  p {
    color: white;
    font-weight: 700;
    font-size: 11px;
  }
`;

export const InterestTag = styled(Tag)`
  position: static;
`;

export const Avartar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin: 20px 0 10px;
  cursor: pointer;
`;

export const ContainerFlexColumn = styled(Container)`
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const Heading = styled(ProcedureHeading)`
  padding-top: 30px;
`;

export const ContainerwithLeftRightMargin = styled(Container)`
  width: 85%;
  margin-left: auto;
  margin-right: auto;
`;

export const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexColumn = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const GenderText = styled(SubText)`
  font-size: 16px;
  font-weight: normal;
  color: ${colors.MidGray};
  align-self: auto;
  margin-top: 0px;
`;

export const BigTextArea = styled.textarea`
  margin-top: 12px;
  height: 105px;
  box-shadow: none;
  filter: none;
`;

export const MidInput = styled.input`
  margin-top: 12px;
  box-shadow: none;
  filter: none;
`;

export const SmallInput = styled.input`
  margin-top: 12px;
  width: 65%;
  box-shadow: none;
  filter: none;
`;

export const Label = styled.p`
  font-size: 16px;
  font-weight: normal;
  color: ${colors.MidGray};
  margin-top: 24px;
  line-height: 20px;
`;

export const LabelSpan = styled.span`
  font-size: 16px;
  font-weight: normal;
  color: ${colors.MidGray};
`;

export const NextButton = styled(MainBtn)`
  position: fixed;
  z-index: 3;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  &:disabled {
    background-color: ${colors.LightGray};
    filter: none;
  }
`;

export const FileLabel = styled.label`
  cursor: pointer;
`;

export const SLink = styled(Link)`
  text-decoration: none;
`;
