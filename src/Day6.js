import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day6Input.txt";

function Day6() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();

  const calculatePart1 = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const cleanedArray = array.map((row) =>
          row
            .substring(row.indexOf(":") + 1, row.length)
            .split(" ")
            .filter((a) => a)
        );

        console.log(cleanedArray);

        let possibleWaysToWin = [];
        cleanedArray[0].forEach((TempoDisponibile, index) => {
          let i = 0;
          for (let pressingTime = 1; pressingTime < Number(TempoDisponibile); pressingTime++) {
            const distanzaPercosa = pressingTime * (Number(TempoDisponibile) - pressingTime);
            if (distanzaPercosa > Number(cleanedArray[1][index])) {
              i++;
            }
          }
          possibleWaysToWin.push(i);
        });

        const sum = possibleWaysToWin.reduce((acc, current) => {
          return Number(acc) * Number(current);
        });
        console.log(sum);
        setPart1Res();
      });
  };

  const calculatePart2 = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const cleanedArray = array.map((row) =>
          row
            .substring(row.indexOf(":") + 1, row.length)
            .split(" ")
            .filter((a) => a)
            .join("")
        );

        console.log(cleanedArray);

        let possibleWaysToWin = [];
        let i = 0;
        for (let pressingTime = 1; pressingTime < Number(cleanedArray[0]); pressingTime++) {
          const distanzaPercosa = pressingTime * (Number(cleanedArray[0]) - pressingTime);
          if (distanzaPercosa > Number(cleanedArray[1])) {
            i++;
          }
        }
        possibleWaysToWin.push(i);

        const sum = possibleWaysToWin.reduce((acc, current) => {
          return Number(acc) * Number(current);
        });
        console.log(sum);
        setPart1Res();
      });
  };

  return (
    <>
      <div>Day5</div>
      Part 1: <CButton onClick={calculatePart1}>Calcola</CButton>
      {part1Res && <>{part1Res}</>}
      <p>
        Part 2: <CButton onClick={calculatePart2}>Calcola</CButton>
      </p>
      {part2Res && <>{part2Res}</>}
    </>
  );
}

export default Day6;
