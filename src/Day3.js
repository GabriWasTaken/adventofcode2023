import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day3Input.txt";

function Day3() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();

  const calculatePart1 = () => {
    const regex = new RegExp(`[^\\w\\s\\.]`);
    const regex2 = new RegExp(`[0-9]`);

    let myArray = Array.from(Array(150), () => new Array(150));
    let formattedArray = Array.from(Array(150), () => new Array(150));

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const indexOfSymbol = array.map((line, lineIndex) =>
          [...line].map((char, index) => {
            formattedArray[lineIndex][index] = char;
            if (char.match(regex)) {
              return index;
            } else {
              return null;
            }
          })
        );

        const checkBackwardForMoreDigits = (i, j, k) => {
          if (j - 1 < 0) return;
          if (array[i][j - 1].match(regex2)) {
            myArray[i][k] = [...array][i][j - 1] + myArray[i][k];
            formattedArray[i][j - 1] = ".";
            checkBackwardForMoreDigits(i, j - 1, k);
          } else return;
        };

        const checkForwardForMoreDigits = (i, j, k) => {
          if (j + 1 >= 140) return;
          if (array[i][j + 1].match(regex2)) {
            myArray[i][k] = myArray[i][k] + [...array][i][j + 1];
            formattedArray[i][j + 1] = ".";
            checkForwardForMoreDigits(i, j + 1, k);
          } else return;
        };

        indexOfSymbol.map((rowOfIndexOfSymbol, rowIndex) =>
          rowOfIndexOfSymbol.map((cellOfIndexOfSymbol, columnIndex) => {
            if (cellOfIndexOfSymbol !== null) {
              for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
                  if (formattedArray[i][j].match(regex2)) {
                    myArray[i][j] = [...array][i][j];
                    formattedArray[i][j] = ".";
                    checkBackwardForMoreDigits(i, j, j);
                    checkForwardForMoreDigits(i, j, j);
                  }
                }
              }
              return 0;
            } else return null;
          })
        );

        const cleanedArray = myArray.map((a) => a.filter((item) => item));
        const sum = cleanedArray.flat().reduce((acc, current) => {
          return Number(acc) + Number(current);
        });
        console.log(cleanedArray);
        console.log(sum);
        setPart1Res(sum);
      });
  };

  const calculatePart2 = () => {
    const regex = new RegExp(`[*]`);
    const regex2 = new RegExp(`[0-9]`);

    let myArray = Array.from(Array(500), () => new Array(500));
    let formattedArray = Array.from(Array(150), () => new Array(150));

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const indexOfSymbol = array.map((line, lineIndex) =>
          [...line].map((char, index) => {
            formattedArray[lineIndex][index] = char;
            if (char.match(regex)) {
              return index;
            } else {
              return null;
            }
          })
        );

        const checkBackwardForMoreDigits = (i, j, k, rowIndex, columnIndex) => {
          if (j - 1 < 0) return;
          if (array[i][j - 1].match(regex2)) {
            myArray[Number(rowIndex)][columnIndex] = [...array][i][j - 1] + myArray[Number(rowIndex)][columnIndex];
            formattedArray[i][j - 1] = ".";
            checkBackwardForMoreDigits(i, j - 1, k, rowIndex, columnIndex);
          } else return;
        };

        const checkForwardForMoreDigits = (i, j, k, rowIndex, columnIndex) => {
          if (j + 1 >= 140) return;
          if (array[i][j + 1].match(regex2)) {
            myArray[Number(rowIndex)][columnIndex] = myArray[Number(rowIndex)][columnIndex] + [...array][i][j + 1];
            formattedArray[i][j + 1] = ".";
            checkForwardForMoreDigits(i, j + 1, k, rowIndex, columnIndex);
          } else return;
        };

        let test = 0;
        indexOfSymbol.map((rowOfIndexOfSymbol, rowIndex) =>
          rowOfIndexOfSymbol.map((cellOfIndexOfSymbol, columnIndex) => {
            if (cellOfIndexOfSymbol !== null) {
              let quadratone = 0;
              for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
                  if (formattedArray[i][j].match(regex2)) {
                    myArray[Number(test)][quadratone] = [...array][i][j];
                    formattedArray[i][j] = ".";
                    checkBackwardForMoreDigits(i, j, j, Number(test), quadratone);
                    checkForwardForMoreDigits(i, j, j, Number(test), quadratone);
                    quadratone++;
                  }
                }
              }
              test++;
              return 0;
            } else return null;
          })
        );

        const cleanedArray = myArray.map((a) => a.filter((item) => item));
        const noSingleOccurency = cleanedArray.map((subarray) => {
          if (subarray.length < 2) return null;
          else return Number(subarray[0]) * Number(subarray[1]);
        });

        const cleanedNoSingleOccurency = noSingleOccurency.filter((item) => item);

        const sum = cleanedNoSingleOccurency.reduce((acc, current) => {
          return Number(acc) + Number(current);
        });
        console.log(cleanedArray);
        console.log(cleanedNoSingleOccurency);
        console.log(sum);
        setPart2Res(sum);
      });
  };

  return (
    <>
      <div>Day3</div>
      Part 1: <CButton onClick={calculatePart1}>Calcola</CButton>
      {part1Res && <>{part1Res}</>}
      <p>
        Part 2: <CButton onClick={calculatePart2}>Calcola</CButton>
      </p>
      {part2Res && <>{part2Res}</>}
    </>
  );
}

export default Day3;
