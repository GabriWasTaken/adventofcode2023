import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day9Input.txt";

function Day9() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();
  const results = [];
  let lastNum;
  let prevNum;

  const calculateSequenceOfDifference = (rowValues, index) => {
    console.log(rowValues);
    const calculateUp = (arr, lastNum, index) => {
      if (prevNum === undefined) {
        lastNum += arr[arr.length - 1];
      } else {
        lastNum += prevNum;
      }
      prevNum = lastNum;
      results[index] = lastNum;
      console.log(prevNum);
    };

    const differenceArray = [];
    let founded = false;
    const someIsNotZero = rowValues.some((item) => Number(item) !== 0);
    if (someIsNotZero) {
      for (let i = rowValues.length - 1; i > 0; i--) {
        differenceArray.push(Number(rowValues[i]) - Number(rowValues[i - 1]));
      }
      const solution = differenceArray.reverse();
      calculateSequenceOfDifference(solution, index);
      lastNum = rowValues[rowValues.length - 1];
      calculateUp(solution, Number(lastNum), index);
    }
  };

  const calculateSequenceOfDifferencePart2 = (rowValues, index) => {
    console.log(rowValues);
    const calculateUp = (arr, lastNum, index) => {
      if (prevNum === undefined) {
        lastNum -= arr[arr.length - 1];
      } else {
        lastNum -= prevNum;
      }
      prevNum = lastNum;
      results[index] = lastNum;
      console.log(prevNum);
    };

    const differenceArray = [];
    let founded = false;
    const someIsNotZero = rowValues.some((item) => Number(item) !== 0);
    if (someIsNotZero) {
      for (let i = rowValues.length - 1; i > 0; i--) {
        differenceArray.push(Number(rowValues[i]) - Number(rowValues[i - 1]));
      }
      const solution = differenceArray.reverse();
      calculateSequenceOfDifferencePart2(solution, index);
      lastNum = rowValues[0];
      calculateUp(solution, Number(lastNum), index);
    }
  };

  const calculatePart1 = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        array.forEach((rowValues, index) => {
          const values = rowValues.split(" ");
          lastNum = 0;
          prevNum = 0;
          calculateSequenceOfDifference(values, index);
        });
        console.log(results);

        const sum = results.reduce((acc, current) => {
          return Number(acc) + Number(current);
        });

        console.log(sum);
      });
  };

  const calculatePart2 = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        array.forEach((rowValues, index) => {
          const values = rowValues.split(" ");
          lastNum = 0;
          prevNum = 0;
          calculateSequenceOfDifferencePart2(values, index);
        });
        console.log(results);

        const sum = results.reduce((acc, current) => {
          return Number(acc) + Number(current);
        });

        console.log(sum);
      });
  };

  return (
    <>
      <div>Day9</div>
      Part 1: <CButton onClick={calculatePart1}>Calcola</CButton>
      {part1Res && <>{part1Res}</>}
      <p>
        Part 2: <CButton onClick={calculatePart2}>Calcola</CButton>
      </p>
      {part2Res && <>{part2Res}</>}
    </>
  );
}

export default Day9;
