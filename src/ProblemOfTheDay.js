import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day1Input.txt";

function ProblemOfTheDay() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();
  const calculatePart1 = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const onlyNumArray = array.map((a) => a.match(/\d/g));
        const only2digitsArray = onlyNumArray.map((a) =>
          a.reduce((acc, current, index, arr) => {
            if (index === 0) {
              return current;
            }

            if (index === arr.length - 1) {
              return acc + current;
            }
            return acc;
          }, 0)
        );

        const doubleSingleDigit = only2digitsArray.map((a) => {
          if (a.length === 1) {
            a = a + a;
          }
          return a;
        });

        const sum = doubleSingleDigit.reduce((acc, current) => Number(acc) + Number(current));

        setPart1Res(sum);
      });
  };

  const calculatePart2 = () => {
    const regex = new RegExp(
      `(?=(one|two|three|four|five|six|seven|eight|nine|\\d)).*(one|two|three|four|five|six|seven|eight|nine|\\d)`
    );

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const onlyNumArray = array.map((a) => a.match(regex));
        const cleanedOnlyNumArray = onlyNumArray.map((a) => a.filter((item) => item));
        const onlyNotStringNumArray = cleanedOnlyNumArray.map((a) => {
          const converted = a.map((word) => {
            switch (word) {
              case "one":
                return "1";
              case "two":
                return "2";
              case "three":
                return "3";
              case "four":
                return "4";
              case "five":
                return "5";
              case "six":
                return "6";
              case "seven":
                return "7";
              case "eight":
                return "8";
              case "nine":
                return "9";
              default:
                return word;
            }
          });
          return converted;
        });

        const only2digitsArray = onlyNotStringNumArray.map((a) =>
          a.reduce((acc, current, index, arr) => {
            if (index === 1) {
              return current;
            }

            if (index === arr.length - 1) {
              return acc + current;
            }
            return acc;
          }, 0)
        );

        const sum = only2digitsArray.reduce((acc, current) => {
          return Number(acc) + Number(current);
        });

        console.log(onlyNumArray);
        console.log(cleanedOnlyNumArray);
        console.log(onlyNotStringNumArray);
        console.log(only2digitsArray);
        console.log(sum);
        setPart2Res(sum);
      });
  };

  return (
    <>
      <div>ProblemOfTheDay</div>
      Part 1: <CButton onClick={calculatePart1}>Calcola</CButton>
      {part1Res && <>{part1Res}</>}
      <p>
        Part 2: <CButton onClick={calculatePart2}>Calcola</CButton>
      </p>
      {part2Res && <>{part2Res}</>}
    </>
  );
}

export default ProblemOfTheDay;
