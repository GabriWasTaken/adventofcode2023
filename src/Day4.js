import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day4Input.txt";

function Day4() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();

  const calculatePart1 = () => {
    let resultsPerRow = [];

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const cleanedArray = array.map((row) => row.substring(row.indexOf(":"), row.length));
        const winHaveArray = cleanedArray.map((row) => row.split("|"));
        winHaveArray.map((subArray) =>
          subArray.reduce((acc, current) => {
            let i = 0;
            const myValues = acc.split(" ");
            const winValues = current.split(" ");
            const myValuesCleaned = myValues.filter((a) => a);
            const winValuesCleaned = winValues.filter((a) => a);

            myValuesCleaned.forEach((value) => {
              if (winValuesCleaned.includes(value)) {
                i++;
              }
            });
            if (i === 0) {
              resultsPerRow.push(0);
            } else {
              resultsPerRow.push(Math.pow(2, i - 1));
            }
          })
        );
        const sum = resultsPerRow.reduce((acc, current) => {
          return Number(acc) + Number(current);
        });
        setPart1Res(sum);
      });
  };

  const calculatePart2 = () => {
    let cardCopies = new Array(199).fill(0);

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const cleanedArray = array.map((row) => row.substring(row.indexOf(":"), row.length));
        const winHaveArray = cleanedArray.map((row) => row.split("|"));
        winHaveArray.map((subArray, index) =>
          subArray.reduce((acc, current) => {
            const myValues = acc.split(" ");
            const winValues = current.split(" ");
            const myValuesCleaned = myValues.filter((a) => a);
            const winValuesCleaned = winValues.filter((a) => a);

            for (let j = 0; j <= cardCopies[index]; j++) {
              let i = 0;
              myValuesCleaned.forEach((value) => {
                if (winValuesCleaned.includes(value)) {
                  i++;
                  if (index + i < winHaveArray.length) {
                    cardCopies[index + i] = cardCopies[index + i] + 1;
                  }
                }
              });
            }
          })
        );
        var cardCopiesWithOriginals = cardCopies.map(function (item) {
          return item + 1;
        });
        const sum = cardCopiesWithOriginals.reduce((acc, current) => {
          return Number(acc) + Number(current);
        });
        setPart2Res(sum);
      });
  };

  return (
    <>
      <div>Day4</div>
      Part 1: <CButton onClick={calculatePart1}>Calcola</CButton>
      {part1Res && <>{part1Res}</>}
      <p>
        Part 2: <CButton onClick={calculatePart2}>Calcola</CButton>
      </p>
      {part2Res && <>{part2Res}</>}
    </>
  );
}

export default Day4;
