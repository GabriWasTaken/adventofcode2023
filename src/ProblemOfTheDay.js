import React from "react";
import { useLocation } from "react-router-dom";
import Day1 from "./Day1";
import Day2 from "./Day2";

function ProblemOfTheDay() {
  const location = useLocation();
  console.log(location.pathname);

  switch (location.pathname) {
    case "/1":
      return <Day1 />;
    case "/2":
      return <Day2 />;
    default:
      return <></>;
  }
}

export default ProblemOfTheDay;
