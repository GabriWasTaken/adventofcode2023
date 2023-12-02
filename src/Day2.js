import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day2Input.txt";
var _ = require("lodash");

function Day2() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();
  //only 12 red cubes, 13 green cubes, and 14 blue cubes?
  const LIMITS = { red: 12, green: 13, blue: 14 };

  const calculatePart1 = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const showedInfos = array.map((row) => row.split(";"));
        const onlyNumbersForRed = showedInfos.map((perGame) =>
          perGame.map((turn) => {
            if (turn.indexOf("red") !== -1) {
              return Number(turn.slice(turn.indexOf("red") - 3, turn.indexOf("red")));
            } else return "";
          })
        );
        const onlyNumbersForBlue = showedInfos.map((perGame) =>
          perGame.map((turn) => {
            if (turn.indexOf("blue") !== -1) {
              return Number(turn.slice(turn.indexOf("blue") - 3, turn.indexOf("blue")));
            } else return "";
          })
        );
        const onlyNumbersForGreen = showedInfos.map((perGame) =>
          perGame.map((turn) => {
            if (turn.indexOf("green") !== -1) {
              return Number(turn.slice(turn.indexOf("green") - 3, turn.indexOf("green")));
            } else return "";
          })
        );
        const cleanedOnlyNumForRed = onlyNumbersForRed.map((a) => a.filter((item) => item));
        const cleanedOnlyNumForBlue = onlyNumbersForBlue.map((a) => a.filter((item) => item));
        const cleanedOnlyNumForGreen = onlyNumbersForGreen.map((a) => a.filter((item) => item));

        const impossibleCombinationRedGame = cleanedOnlyNumForRed.map((game, gameNumber) =>
          game.map((val) => (val > LIMITS.red ? gameNumber + 1 : null))
        );
        const impossibleCombinationBlueGame = cleanedOnlyNumForBlue.map((game, gameNumber) =>
          game.map((val) => (val > LIMITS.blue ? gameNumber + 1 : null))
        );
        const impossibleCombinationGreenGame = cleanedOnlyNumForGreen.map((game, gameNumber) =>
          game.map((val) => (val > LIMITS.green ? gameNumber + 1 : null))
        );

        const impossibleCombinationRedGameCleaned = impossibleCombinationRedGame.map((a) => a.filter((item) => item));
        const impossibleCombinationBlueGameCleaned = impossibleCombinationBlueGame.map((a) => a.filter((item) => item));
        const impossibleCombinationGreenGameCleaned = impossibleCombinationGreenGame.map((a) =>
          a.filter((item) => item)
        );

        const removedDuplicateRed = impossibleCombinationRedGameCleaned.map((array) => _.uniq(array));
        const removedDuplicateBlue = impossibleCombinationBlueGameCleaned.map((array) => _.uniq(array));
        const removedDuplicateGreen = impossibleCombinationGreenGameCleaned.map((array) => _.uniq(array));

        const flattenedRed = removedDuplicateRed.flat();
        const flattenedBlue = removedDuplicateBlue.flat();
        const flattenedGreen = removedDuplicateGreen.flat();

        const allColorsCombined = flattenedRed.concat(flattenedBlue, flattenedGreen);
        const allColorsCombinedCleaned = _.uniq(allColorsCombined);

        const sum = allColorsCombinedCleaned.reduce((acc, current) => {
          return acc + current;
        });

        const inversedSum = 5050 - sum;

        setPart1Res(inversedSum);

        console.log(inversedSum);
      });
  };

  const calculatePart2 = () => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const showedInfos = array.map((row) => row.split(";"));
        const onlyNumbersForRed = showedInfos.map((perGame) =>
          perGame.map((turn) => {
            if (turn.indexOf("red") !== -1) {
              return Number(turn.slice(turn.indexOf("red") - 3, turn.indexOf("red")));
            } else return "";
          })
        );
        const onlyNumbersForBlue = showedInfos.map((perGame) =>
          perGame.map((turn) => {
            if (turn.indexOf("blue") !== -1) {
              return Number(turn.slice(turn.indexOf("blue") - 3, turn.indexOf("blue")));
            } else return "";
          })
        );
        const onlyNumbersForGreen = showedInfos.map((perGame) =>
          perGame.map((turn) => {
            if (turn.indexOf("green") !== -1) {
              return Number(turn.slice(turn.indexOf("green") - 3, turn.indexOf("green")));
            } else return "";
          })
        );
        const cleanedOnlyNumForRed = onlyNumbersForRed.map((a) => a.filter((item) => item));
        const cleanedOnlyNumForBlue = onlyNumbersForBlue.map((a) => a.filter((item) => item));
        const cleanedOnlyNumForGreen = onlyNumbersForGreen.map((a) => a.filter((item) => item));

        const neededRedCubesPerGame = cleanedOnlyNumForRed.map((game, gameNumber) => Math.max.apply(Math, game));
        const neededBlueCubesPerGame = cleanedOnlyNumForBlue.map((game, gameNumber) => Math.max.apply(Math, game));
        const neededGreenCubesPerGame = cleanedOnlyNumForGreen.map((game, gameNumber) => Math.max.apply(Math, game));

        let cubePowerForGame = [];

        for (let i = 0; i < 100; i++) {
          cubePowerForGame.push(neededRedCubesPerGame[i] * neededBlueCubesPerGame[i] * neededGreenCubesPerGame[i]);
        }

        const sumThePower = cubePowerForGame.reduce((acc, current) => {
          return acc + current;
        });

        console.log(sumThePower);
      });
  };

  return (
    <>
      <div>Day2</div>
      Part 1: <CButton onClick={calculatePart1}>Calcola</CButton>
      {part1Res && <>{part1Res}</>}
      <p>
        Part 2: <CButton onClick={calculatePart2}>Calcola</CButton>
      </p>
      {part2Res && <>{part2Res}</>}
    </>
  );
}

export default Day2;
