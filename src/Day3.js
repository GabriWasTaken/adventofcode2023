import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day3Input.txt";
var _ = require("lodash");

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
            checkBackwardForMoreDigits(i, j - 1, k);
          } else return;
        };

        const checkForwardForMoreDigits = (i, j, k) => {
          if (j + 1 >= 140) return;
          if (array[i][j + 1].match(regex2)) {
            myArray[i][k] = myArray[i][k] + [...array][i][j + 1];
            checkForwardForMoreDigits(i, j + 1, k);
          } else return;
        };

        const test = indexOfSymbol.map((rowOfIndexOfSymbol, rowIndex) =>
          rowOfIndexOfSymbol.map((cellOfIndexOfSymbol, columnIndex) => {
            if (cellOfIndexOfSymbol !== null) {
              for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
                for (let j = columnIndex - 1; j <= columnIndex + 1; j++) {
                  if ([...array][i][j].match(regex2)) {
                    if (!([...array][i][j].match(regex2) && [...array][i][j - 1].match(regex2))) {
                      myArray[i][j] = [...array][i][j];
                      checkBackwardForMoreDigits(i, j, j);
                      checkForwardForMoreDigits(i, j, j);
                    }
                  }
                }
              }
              return 0;
            } else return null;
          })
        );

        console.log(myArray);
      });
  };

  const calculatePart2 = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        array.map((char, index) => {
          if (char.match(/[^\w\s\.]/g)) {
            return index;
          } else {
            return char;
          }
        });
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
