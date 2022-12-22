import { useCallback } from "react";
import { useLocation } from "react-router";


export const UseBackLink = () => {
  const location = useLocation();

  console.log(location.state)
  console.log(location.state.path)
}