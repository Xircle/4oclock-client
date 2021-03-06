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

    if (placeData?.reviews?.[0]?.imageUrls) {
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
    } else {
      history.goBack();
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
        "?????? ?????? ????????? ??????????????????. ?????? ????????? ?????? 10MB?????????. "
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
          "?????? ?????? ????????? ??????????????????. ?????? ????????? ?????? 10MB?????????. "
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
        ?????? ??????
        <br />
        <MidInput
          name="name"
          value={state.name}
          placeholder="ex. ????????? ??????"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setName", payload: e.target.value })
          }
        />
      </SubContainer>
      <SubContainer>
        ?????????
        <div>
          <DatePicker onChange={setStartDate} value={state.startDateAt} />
        </div>
      </SubContainer>
      <SubContainer>
        ???????????? (0~24)
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
        ????????? ??????
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
          <option value="??????" style={{ color: colors.Black }}>
            ??????
          </option>
          <option value="??????" style={{ color: colors.Black }}>
            ??????
          </option>
          <option value="??????" style={{ color: colors.Black }}>
            ??????
          </option>
        </select>
      </SubContainer>
      <SubContainer>
        ?????? (ex. 20???~26???, ??????)
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
          <FlexDiv>???????????? ??????</FlexDiv>
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
          <FlexDiv>????????????(???) ??????</FlexDiv>
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
        ??????(???????????? ????????? ?????????????????? %??? ??????????????????)
        <br />
        <BigTextArea
          name="reviewDescriptions"
          value={state.reviewDescription}
          placeholder="ex. ?????? ????????????!% ??? ??????????????? ???????????? ??? ???????????????"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: "setReviewDescriptions",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        ??????
        <br />
        <MidInput
          name="title"
          value={state.title}
          placeholder="ex. ?????? ?????? ????????????"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "setTitle", payload: e.target.value })
          }
        />
      </SubContainer>
      <SubContainer>
        ??????
        <br />
        <BigTextArea
          name="description"
          value={state.description}
          placeholder="ex. ????????? ???????????? ???????????? ?????????~????????? ?????????, ????????? ????????? ?????? ??? ??????!?????? ????????? ??? ?????? ??????????"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            dispatch({
              type: "setDescription",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        ????????????(%??? ?????????????????? / ?????? ?????? ??????)
        <br />
        <MidInput
          name="categories"
          value={JSON.stringify(state.categories)
            .replaceAll("[", "")
            .replaceAll('"', "")
            .replaceAll(",", "%")
            .replaceAll("]", "")}
          placeholder="ex. ?????????,?????????,????????????"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setCategories",
              payload: ModifyStringToStringArray(e.target.value, "%"),
            })
          }
        />
      </SubContainer>
      <SubContainer>
        ????????????(Kakao map?????? ?????? ????????? ????????????)
        <br />
        <MidInput
          name="detailAddress"
          value={state.detailAddress}
          placeholder="ex. ?????? ????????? ????????????24??? 58-5"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setDetailAddress",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        ?????? (????????????????????? ??????????????? ????????? URL)
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
        ????????????
        <br />
        <MidInput
          name="oneLineIntroText"
          value={state.oneLineIntroText}
          placeholder="ex. ?????? ??????, ?????? ?????? ?????? ?????? ????????????"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: "setOneLineIntroText",
              payload: e.target.value,
            })
          }
        />
      </SubContainer>
      <SubContainer>
        ????????? ?????????
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
        ??????? (????????? ???)
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
            ?????????
          </option>
          <option value="true" style={{ color: colors.Black }}>
            ???
          </option>
        </select>
      </SubContainer>
      <SubContainer>
        ?????? ????????? (??????)
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
        ?????? ??????
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
