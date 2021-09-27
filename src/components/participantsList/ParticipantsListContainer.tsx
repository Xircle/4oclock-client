import styled from "styled-components";
import type { ParticipantsListData } from "../../lib/api/types";
import ClipLoader from "react-spinners/ClipLoader";
import { LoaderWrapper } from "../shared/Loader";
import { colors, Heading } from "../../styles/styles";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  if (hasError) return <Heading>에러가 발생했습니다.</Heading>;
  if (isLoading)
    return (
      <>
        <LoaderWrapper top={"60%"}>
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
          key={participantsListData.id}
          //   onClick={() =>
          //     history.push(
          //       `/place/${placeFeedData.id}?isFinal=${
          //         placeFeedData.deadline === "오늘 마감"
          //       }&isClosed=${placeFeedData.isClosed}`
          //     )
          //   }
          {...participantsListData}
        />
      ))}
      <ParticipantsListRow
        id="111"
        job="선생님을 준비하는 대확생"
        profileImg="/avatar/2donny.png"
        shortBio="ewofnp wae nfpao wen fpoaw enf paowe nfpoa wenfpa onefpa onefpo anwefop anwefop napoe fnaopwenf pawenfopaw enfopawne fop"
      />
      <ParticipantsListRow
        id="111"
        job="선생님을 준비하는 대확생"
        shortBio="ewofnp wae nfpao wen fpoaw enf paowe nfpoa wenfpa onefpa onefpo anwefop anwefop napoe fnaopwenf pawenfopaw enfopawne fop"
      />
      <ParticipantsListRow
        id="111"
        job="선생님을 준비하는 대확생"
        profileImg="/avatar/2donny.png"
        shortBio="ewofnp wae nfpao wen fpoaw enf paowe nfpoa wenfpa onefpa onefpo anwefop anwefop napoe fnaopwenf pawenfopaw enfopawne fop"
      />
      <ParticipantsListRow
        id="111"
        job="선생님을 준비하는 대확생"
        profileImg="/avatar/2donny.png"
        shortBio="ewofnp wae nfpao wen fpoaw enf paowe nfpoa wenfpa onefpa onefpo anwefop anwefop napoe fnaopwenf pawenfopaw enfopawne fop"
      />
      <ParticipantsListRow
        id="111"
        job="선생님을 준비하는 대확생"
        profileImg="/avatar/2donny.png"
        shortBio="ewofnp wae nfpao wen fpoaw enf paowe nfpoa wenfpa onefpa onefpo anwefop anwefop napoe fnaopwenf pawenfopaw enfopawne fop"
      />
      <ParticipantsListRow
        id="111"
        job="선생님을 준비하는 대확생"
        profileImg="/avatar/2donny.png"
        shortBio="ewofnp wae nfpao wen fpoaw enf paowe nfpoa wenfpa onefpa onefpo anwefop anwefop napoe fnaopwenf pawenfopaw enfopawne fop"
      />
      <ParticipantsListRow
        id="111"
        job="선생님을 준비하는 대확생"
        profileImg="/avatar/2donny.png"
        shortBio="ewofnp wae nfpao wen fpoaw enf paowe nfpoa wenfpa onefpa onefpo anwefop anwefop napoe fnaopwenf pawenfopaw enfopawne fop"
      />
      <ParticipantsListRow
        id="111"
        job="선생님을 준비하는 대확생"
        profileImg="/avatar/2donny.png"
        shortBio="ewofnp wae nfpao wen fpoaw enf paowe nfpoa wenfpa onefpa onefpo anwefop anwefop napoe fnaopwenf pawenfopaw enfopawne fop"
      />
    </>
  );
}
