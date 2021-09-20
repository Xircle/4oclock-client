import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
export default function useUrlQuery() {
  const [queryParms, setQueryParams] =
    useState<queryString.ParsedQuery<string>>();
  const location = useLocation();

  useEffect(() => {
    const queryParmas = queryString.parse(location.search);
    setQueryParams(queryParmas);
  }, []);
  return queryParms;
}
