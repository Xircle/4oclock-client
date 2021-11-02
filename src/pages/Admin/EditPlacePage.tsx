import React, { useState, useEffect, useReducer } from "react";
import styled from "styled-components";
import {
  Container,
  Heading,
  MidInput,
  FileLabel,
  FlexDiv,
  BigTextArea,
  colors,
  MainBtn,
} from "../../styles/styles";
import { getPlaceById } from "../../lib/api/getPlaceById";
import type { PlaceData } from "../../lib/api/types";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { ModifyStringToStringArray } from "../../lib/utils";
import { placeInitialState, reducer } from "./AdminReducer";
import DatePicker from "react-date-picker";
import { editPlace } from "../../lib/api/editPlace";

interface Props {}

interface MatchParams {
  placeId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export default function EditPlacePage({ match }: Props) {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, placeInitialState);
  const [startDate, setStartDate] = useState(new Date());
  const [mainFile, setMainFile] = useState<File>();
  const [subFiles, setSubFiles] = useState<File[]>([]);
  const [mainFileUrl, setMainFileUrl] = useState<string>();
  const [subFilesUrl, setSubFilesUrl] = useState<string[]>([]);
  const [loading, SetLoading] = useState(false);
  const { placeId } = match.params;
  const { data: placeData, isLoading } = useQuery<PlaceData | undefined>(
    ["Admin-place-detail", placeId],
    () => getPlaceById(placeId),
    {
      onError: (err: any) => {
        alert(err);
        return;
      },
      retry: 1,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (placeData?.name)
      dispatch({ type: "setName", payload: placeData?.name });
    if (placeData?.isLightning)
      dispatch({ type: "setIsLightning", payload: placeData?.isLightning });
    if (placeData?.placeDetail?.maxParticipantsNumber)
      dispatch({
        type: "setMaxParticipantsNumber",
        payload: placeData?.placeDetail?.maxParticipantsNumber + "",
      });
    //if (placeData?.location) state.location = placeData?.location;
    if (placeData?.oneLineIntroText)
      dispatch({
        type: "setOneLineIntroText",
        payload: placeData?.oneLineIntroText,
      });
    if (
      placeData?.placeDetail?.participationFee ||
      placeData?.placeDetail?.participationFee === 0
    )
      dispatch({
        type: "setParticipationFee",
        payload: placeData?.placeDetail?.participationFee + "",
      });
    if (placeData?.recommendation)
      dispatch({
        type: "setRecommendation",
        payload: placeData?.recommendation,
      });
    if (placeData?.startDateAt)
      dispatch({
        type: "setStartDateAt",
        payload: new Date(placeData?.startDateAt),
      });
    if (placeData?.startTime)
      dispatch({ type: "setStartTime", payload: placeData?.startTime + "" });
    if (placeData?.placeDetail?.title)
      dispatch({ type: "setTitle", payload: placeData?.placeDetail?.title });
    if (placeData?.placeDetail?.description)
      dispatch({
        type: "setDescription",
        payload: placeData?.placeDetail?.description,
      });
    if (placeData?.placeDetail?.categories) {
      dispatch({
        type: "setCategories",
        payload: JSON.parse(placeData?.placeDetail?.categories),
      });
    }
    if (placeData?.placeDetail?.detailAddress)
      dispatch({
        type: "setDetailAddress",
        payload: placeData?.placeDetail?.detailAddress,
      });
    if (placeData?.placeDetail?.detailLink)
      dispatch({
        type: "setDetailLink",
        payload: placeData?.placeDetail?.detailLink,
      });

    if (placeData?.reviews?.[0].imageUrls) {
      for (let i = 0; i < placeData?.reviews?.[0].imageUrls.length; i++) {
        setSubFilesUrl((prev) => [
          ...prev,
          placeData?.reviews?.[0].imageUrls[i],
        ]);
      }
    }
    if (placeData?.coverImage) {
      setMainFileUrl(placeData?.coverImage);
      dispatch({ type: "setCoverImageUrl", payload: placeData?.coverImage });
    }
  }, [placeData, placeData?.placeDetail]);

  useEffect(() => {
    console.log(state);
  }, [state]);
  useEffect(() => {
    dispatch({
      type: "setStartDateAt",
      payload: startDate,
    });
  }, [startDate]);

  useEffect(() => {
    dispatch({
      type: "setReviewImagesUrl",
      payload: subFilesUrl,
    });
  }, [subFilesUrl]);
  useEffect(() => {
    dispatch({
      type: "setReviewImagesFile",
      payload: subFiles,
    });
  }, [subFiles]);
  const { mutateAsync: mutateEditPlace, isLoading: isPatching } =
    useMutation(editPlace);
  const onClickHandler = async () => {
    if (!placeId) return;
    const { data } = await mutateEditPlace({ placeId, state });
    if (!data.ok) {
      throw new Error(data.error);
    }
  };

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;

    const files = e.target.files;
    const __file = files[0];
    const __size = files[0]?.size;

    console.log(files.length);

    if (__size > 10000000) {
      return alert(
        "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. "
      );
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(__file);
    fileReader.onload = (e) => {
      dispatch({
        type: "setCoverImageUrl",
        payload: e.target!.result as string,
      });
      setMainFileUrl(e.target!.result as string);
    };
    dispatch({
      type: "setCoverImageFile",
      payload: __file,
    });
    setMainFile(__file);
  };

  const handleFilesOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return null;
    setSubFilesUrl([]);
    setSubFiles([]);
    const files = e.target.files;

    console.log(files.length);
    for (let i = 0; i < files.length; i++) {
      if (files[i]?.size > 10000000) {
        return alert(
          "사진 최대 용량을 초과했습니다. 사진 용량은 최대 10MB입니다. "
        );
      }
    }
    Array.from(files).forEach((file) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        setSubFilesUrl((prev) => [...prev, e.target!.result as string]);
      };
      setSubFiles((prev) => [...prev, file]);
    });
  };

  return (
    <Container>
      <Heading>{placeData?.name}</Heading>
      <SubContainer>
        모임 이름
        <br />
        <MidInput
          name="name"
          value={state.name}
          placeholder="ex. 한잔의 추억"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setName", payload: e.target.value })
          }
        />
      </SubContainer>
      <SubContainer>
        모임일
        <div>
          <DatePicker onChange={setStartDate} value={state.startDateAt} />
        </div>
      </SubContainer>
      <SubContainer>
        모임시간 (0~24)
        <br />
        <MidInput
          name="time"
          value={state.startTime}
          placeholder="ex. 6"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setStartTime", payload: e.target.value })
          }
        />
      </SubContainer>
      <SubContainer>
        대략적 위치
        <select
          id=""
          value={state.location}
          name="location"
          style={{ marginTop: "12px", color: colors.Black }}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({
              type: "setLocation",
              payload: e.target.value,
            });
          }}
        >
          <option value="전체" style={{ color: colors.Black }}>
            전체
          </option>
          <option value="안암" style={{ color: colors.Black }}>
            안암
          </option>
          <option value="신촌" style={{ color: colors.Black }}>
            신촌
          </option>
        </select>
      </SubContainer>
      <SubContainer>
        제한 (ex. 20세~26세, 모든)
        <br />
        <MidInput
          name="recommendation"
          value={state.recommendation}
          placeholder="recommendation"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setRecommendation", payload: e.target.value })
          }
        />
      </SubContainer>
      <SubContainer>
        <FileLabel htmlFor="main-files">
          <FlexDiv>메인사진 넣기</FlexDiv>
          <input
            id="main-files"
            type="file"
            onChange={handleFileOnChange}
            style={{ display: "none" }}
          />
        </FileLabel>
        <div>
          {mainFileUrl && (
            <Photo src={mainFileUrl || "/avatar/anonymous_user.png"}></Photo>
          )}
        </div>
      </SubContainer>
      <SubContainer>
        <FileLabel htmlFor="sub-files">
          <FlexDiv>서브사진(들) 넣기</FlexDiv>
          <input
            id="sub-files"
            type="file"
            onChange={handleFilesOnChange}
            style={{ display: "none" }}
            multiple
          />
        </FileLabel>
        <div>
          {subFilesUrl.map((fileUrl, idx) => (
            <Photo
              key={idx}
              src={fileUrl || "/avatar/anonymous_user.png"}
            ></Photo>
          ))}
        </div>
      </SubContainer>
      <SubContainer>
        리뷰(서브사진 숫자와 맞추어주시고 %로 나누어주세요)
        <br />
        <BigTextArea
          name="reviewDescriptions"
          value={state.reviewDescription}
          placeholder="ex. 정말 꿀잼인듯!% 와 이런장소가 있었다니 또 와야겠네요"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: "setReviewDescriptions",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        제목
        <br />
        <MidInput
          name="title"
          value={state.title}
          placeholder="ex. 고대 근본 막걸리집"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setTitle", payload: e.target.value })
          }
        />
      </SubContainer>
      <SubContainer>
        설명
        <br />
        <BigTextArea
          name="description"
          value={state.description}
          placeholder="ex. 맥주는 싱거우니 신촌골로 돌려라~언제나 정겹고, 언제나 맛있는 바로 그 가게!아는 분들은 다 알고 계시죠?"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: "setDescription",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        카테고리(%로 나누어주세요 / 현재 사용 ㄴㄴ)
        <br />
        <MidInput
          name="categories"
          value={JSON.stringify(state.categories)
            .replaceAll("[", "")
            .replaceAll('"', "")
            .replaceAll(",", "%")
            .replaceAll("]", "")}
          placeholder="ex. 막걸리,안주맛,북적북적"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setCategories",
              payload: ModifyStringToStringArray(e.target.value, "%"),
            })
          }
        />
      </SubContainer>
      <SubContainer>
        상세주소(Kakao map에서 지번 그대로 가져오기)
        <br />
        <MidInput
          name="detailAddress"
          value={state.detailAddress}
          placeholder="ex. 서울 성북구 고려대로24길 58-5"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setDetailAddress",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        링크 (네이버지도에서 장소검색시 나오는 URL)
        <br />
        <MidInput
          name="detailLink"
          value={state.detailLink}
          placeholder="ex. https://map.naver.com/v5/search/%EB%A7%89%EA%B1%B8%EB%A6%AC%EC%B0%AC%EA%B0%80/place/100544741?c=14140901.3122277,4520956.3955455,15,0,0,0,dh"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setDetailLink",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        한줄소개
        <br />
        <MidInput
          name="oneLineIntroText"
          value={state.oneLineIntroText}
          placeholder="ex. 안주 좋고, 기분 좋은 고대 근본 막걸리집"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setOneLineIntroText",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        참가비 숫자로
        <br />
        <MidInput
          name="participationFee"
          value={state.participationFee}
          placeholder="ex. 0"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setParticipationFee",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        번개? (맞으면 예)
        <br />
        <select
          id=""
          value={state.isLightning + ""}
          name="isLightning"
          style={{ marginTop: "12px", color: colors.Black }}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({
              type: "setIsLightning",
              payload: e.target.value === "true",
            });
          }}
        >
          <option value="false" style={{ color: colors.Black }}>
            아니오
          </option>
          <option value="true" style={{ color: colors.Black }}>
            예
          </option>
        </select>
      </SubContainer>
      <SubContainer>
        모임 인원수 (숫자)
        <br />
        <MidInput
          name="maxParticipantsNumber"
          value={state.maxParticipantsNumber}
          placeholder="ex. 4"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: "setMaxParticipantsNumber",
              payload: e.target.value,
            });
          }}
        />
      </SubContainer>
      <MainBtn
        onClick={() => {
          if (!isLoading) {
            onClickHandler();
          }
        }}
      >
        장소 생성
      </MainBtn>
    </Container>
  );
}

const SubContainer = styled(Container)`
  margin: 50px 0;
`;

const Photo = styled.img`
  width: 125px;
  height: 125px;
  margin-top: 45px;
  border-radius: none;
  object-fit: cover;
`;
