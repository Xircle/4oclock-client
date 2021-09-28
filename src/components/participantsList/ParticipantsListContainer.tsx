import type { ParticipantsListData } from "../../lib/api/types";
import ClipLoader from "react-spinners/ClipLoader";
import { LoaderWrapper } from "../shared/Loader";
import { colors, Heading } from "../../styles/styles";
import ParticipantsListRow from "./ParticipantsListRow";

interface Props {
  ParticipantsListData?: ParticipantsListData[];
  isLoading: boolean;
  hasError: boolean;
}

export default function ParticipantsListContainer({
  isLoading,
  hasError,
  ParticipantsListData,
}: Props) {
  if (hasError) return <Heading>에러가 발생했습니다.</Heading>;
  if (isLoading)
    return (
      <>
        <LoaderWrapper top={"40%"}>
          <ClipLoader
            loading={isLoading}
            color={colors.MidBlue}
            css={{
              name: "width",
              styles: "border-width: 4px; z-index: 999;",
            }}
            size={40}
          />
        </LoaderWrapper>
      </>
    );

  return (
    <>
      {ParticipantsListData?.map((participantsListData) => (
        <ParticipantsListRow
          key={participantsListData.userId}
          {...participantsListData}
        />
      ))}
    </>
  );
}
