import { Helmet } from "react-helmet";

export interface Props {
  title: string;
}

export default function PageTitle({ title }: Props) {
  return (
    <Helmet>
      <title> {title} | 케빈의 클럽 </title>
    </Helmet>
  );
}
