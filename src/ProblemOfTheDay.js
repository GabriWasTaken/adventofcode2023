import React from "react";
import { useLocation } from "react-router-dom";
import Day1 from "./Day1";
import Day2 from "./Day2";
import Day3 from "./Day3";
import Day4 from "./Day4";
import Day5 from "./Day5";
import Day6 from "./Day6";
import Day7 from "./Day7";
import Day8 from "./Day8";
import Day9 from "./Day9";

function ProblemOfTheDay() {
  const location = useLocation();
  console.log(location.pathname);

  switch (location.pathname) {
    case "/1":
      return <Day1 />;
    case "/2":
      return <Day2 />;
    case "/3":
      return <Day3 />;
    case "/4":
      return <Day4 />;
    case "/5":
      return <Day5 />;
    case "/6":
      return <Day6 />;
    case "/7":
      return <Day7 />;
    case "/8":
      return <Day8 />;
    case "/9":
      return <Day9 />;
    default:
      return <></>;
  }
}

export default ProblemOfTheDay;
