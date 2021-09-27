import styled from "styled-components";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  backgroundColor?: string;
  fontColor?: string;
}

export default function InfoBox({
  children,
  backgroundColor,
  fontColor,
}: Props) {
  return (
    <Container backgroundColor={backgroundColor} fontColor={fontColor}>
      {children}
    </Container>
  );
}

const Container = styled.div<{ backgroundColor?: string; fontColor?: string }>`
  width: 308px;
  border-radius: 4px;
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#dbedff"};
  margin-left: auto;
  margin-right: auto;
  color: ${(props) => (props.fontColor ? props.fontColor : "#18a0fb")};
  font-size: 13px;
  line-height: 18px;
  font-weight: normal;
  padding: 12px 18px;

  b {
    font-weight: bold;
  }
`;
