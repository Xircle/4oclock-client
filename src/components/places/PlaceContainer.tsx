import type { PlaceData } from "../../lib/api/types";
import Place from "./Place";

interface Props {
  places?: PlaceData[];
}

export default function PlaceContainer({ places }: Props) {
  if (places?.length === 0) return <p>열려있는 식탁이 없어요 :( </p>;
  return (
    <>
      {places?.map((place) => (
        <Place key={place.id} {...place} />
      ))}
    </>
  );
}
