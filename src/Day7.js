import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day7Input.txt";

function Day7() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();

  const calculatePart1 = () => {
    const ORDER = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

    const checkHighCard = (charsA, charsB) => {
      let result = 0;
      charsA.forEach((element, index) => {
        ORDER.forEach((power) => {
          if (!(element === power && charsB[index] === power) && result === 0) {
            if (element === power) result = -1;
            if (charsB[index] === power) result = 1;
          }
        });
      });
      return result;
    };

    const isThreeAndCouple = (a, b) => {
      let objA = {};
      let objB = {};
      let foundedThreeA = false;
      let foundedCopleA = false;
      let foundedThreeB = false;
      let foundedCopleB = false;

      for (let i = 0; i < a.length; i++) {
        let l = a.charAt(i);
        objA[l] = isNaN(objA[l]) ? 1 : objA[l] + 1;
      }

      for (let i = 0; i < b.length; i++) {
        let l = b.charAt(i);
        objB[l] = isNaN(objB[l]) ? 1 : objB[l] + 1;
      }

      for (let key in objA) {
        if (objA.hasOwnProperty(key) && objA[key] === 2) {
          foundedCopleA = true;
        }
        if (objA.hasOwnProperty(key) && objA[key] === 3) {
          foundedThreeA = true;
        }
      }

      for (let key in objB) {
        if (objB.hasOwnProperty(key) && objB[key] === 2) {
          foundedCopleB = true;
        }
        if (objB.hasOwnProperty(key) && objB[key] === 3) {
          foundedThreeB = true;
        }
      }

      if (foundedCopleA && foundedThreeA && foundedCopleB && foundedThreeB) {
        const charsA = a.split("");
        const charsB = b.split("");
        return checkHighCard(charsA, charsB);
      }
      if (foundedCopleA && foundedThreeA) {
        return -1;
      }
      if (foundedCopleB && foundedThreeB) {
        return 1;
      }
    };

    const isDoubleCouple = (a, b) => {
      let objA = {};
      let objB = {};
      let foundedCopleA = 0;
      let foundedCopleB = 0;

      for (let i = 0; i < a.length; i++) {
        let l = a.charAt(i);
        objA[l] = isNaN(objA[l]) ? 1 : objA[l] + 1;
      }

      for (let i = 0; i < b.length; i++) {
        let l = b.charAt(i);
        objB[l] = isNaN(objB[l]) ? 1 : objB[l] + 1;
      }

      for (let key in objA) {
        if (objA.hasOwnProperty(key) && objA[key] === 2) {
          foundedCopleA++;
        }
      }

      for (let key in objB) {
        if (objB.hasOwnProperty(key) && objB[key] === 2) {
          foundedCopleB++;
        }
      }

      if (foundedCopleA === 2 && foundedCopleB === 2) {
        const charsA = a.split("");
        const charsB = b.split("");
        return checkHighCard(charsA, charsB);
      }
      if (foundedCopleA === 2) {
        return -1;
      }
      if (foundedCopleB === 2) {
        return 1;
      }
    };

    const isNumberOfAKind = (a, b, repetition) => {
      let objA = {};
      let objB = {};
      let foundedA = false;
      let foundedB = false;

      for (let i = 0; i < a.length; i++) {
        let l = a.charAt(i);
        objA[l] = isNaN(objA[l]) ? 1 : objA[l] + 1;
      }

      for (let i = 0; i < b.length; i++) {
        let l = b.charAt(i);
        objB[l] = isNaN(objB[l]) ? 1 : objB[l] + 1;
      }

      for (let key in objA) {
        if (objA.hasOwnProperty(key) && objA[key] === repetition) {
          foundedA = true;
        }
      }

      for (let key in objB) {
        if (objB.hasOwnProperty(key) && objB[key] === repetition) {
          foundedB = true;
        }
      }

      if (foundedA && foundedB) {
        const charsA = a.split("");
        const charsB = b.split("");
        return checkHighCard(charsA, charsB);
      }
      if (foundedA) {
        return -1;
      }
      if (foundedB) {
        return 1;
      }
    };

    function compareHands(a, b) {
      const charsA = a[0].split("");
      const charsB = b[0].split("");
      const isFive = isNumberOfAKind(a[0], b[0], 5);
      if (isFive !== 0 && isFive !== undefined) return isFive;
      const isFour = isNumberOfAKind(a[0], b[0], 4);
      if (isFour !== 0 && isFour !== undefined) return isFour;

      const isThreeAndACouple = isThreeAndCouple(a[0], b[0]);
      if (isThreeAndACouple !== 0 && isThreeAndACouple !== undefined) return isThreeAndACouple;

      const isThree = isNumberOfAKind(a[0], b[0], 3);
      if (isThree !== 0 && isThree !== undefined) return isThree;

      const isADoubleCouple = isDoubleCouple(a[0], b[0]);
      if (isADoubleCouple !== 0 && isADoubleCouple !== undefined) return isADoubleCouple;

      const isTwo = isNumberOfAKind(a[0], b[0], 2);
      if (isTwo !== 0 && isTwo !== undefined) return isTwo;

      return checkHighCard(charsA, charsB);
    }

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const cleanedArray = array.map((row) => row.split(" "));

        const sortedArray = cleanedArray.sort(compareHands);
        const reversed = sortedArray.reverse();
        console.log(reversed);
        let results = [];
        reversed.forEach((element, rank) => {
          results.push(Number(element[1]) * (rank + 1));
        });

        const sum = results.reduce((acc, current) => {
          return Number(acc) + Number(current);
        });

        console.log(results);
        console.log(sum);
      });
  };

  const calculatePart2 = () => {
    const ORDER = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

    const checkHighCard = (charsA, charsB) => {
      let result = 0;
      charsA.forEach((element, index) => {
        ORDER.forEach((power) => {
          if (!(element === power && charsB[index] === power) && result === 0) {
            if (element === power) result = -1;
            if (charsB[index] === power) result = 1;
          }
        });
      });
      return result;
    };

    const isThreeAndCouple = (a, b) => {
      let objA = {};
      let objB = {};
      let foundedThreeA = false;
      let foundedCopleA = false;
      let foundedThreeB = false;
      let foundedCopleB = false;

      const filteredA = a.split("").filter((char) => char !== "J");
      const filteredB = b.split("").filter((char) => char !== "J");
      const numberOfJollyA = 5 - filteredA.length;
      const numberOfJollyB = 5 - filteredB.length;

      for (let i = 0; i < filteredA.length; i++) {
        let l = filteredA.charAt(i);
        objA[l] = isNaN(objA[l]) ? 1 : objA[l] + 1;
      }

      for (let i = 0; i < filteredB.length; i++) {
        let l = filteredB.charAt(i);
        objB[l] = isNaN(objB[l]) ? 1 : objB[l] + 1;
      }

      for (let key in objA) {
        if (objA.hasOwnProperty(key) && objA[key] === 2) {
          foundedCopleA = true;
        }
        if (objA.hasOwnProperty(key) && objA[key] === 3) {
          foundedThreeA = true;
        }
      }

      for (let key in objB) {
        if (objB.hasOwnProperty(key) && objB[key] === 2) {
          foundedCopleB = true;
        }
        if (objB.hasOwnProperty(key) && objB[key] === 3) {
          foundedThreeB = true;
        }
      }

      if (foundedCopleA && foundedThreeA && foundedCopleB && foundedThreeB) {
        const charsA = a.split("");
        const charsB = b.split("");
        return checkHighCard(charsA, charsB);
      }
      if (foundedCopleA && foundedThreeA) {
        return -1;
      }
      if (foundedCopleB && foundedThreeB) {
        return 1;
      }
    };

    const isDoubleCouple = (a, b) => {
      let objA = {};
      let objB = {};
      let foundedCopleA = 0;
      let foundedCopleB = 0;

      for (let i = 0; i < a.length; i++) {
        let l = a.charAt(i);
        objA[l] = isNaN(objA[l]) ? 1 : objA[l] + 1;
      }

      for (let i = 0; i < b.length; i++) {
        let l = b.charAt(i);
        objB[l] = isNaN(objB[l]) ? 1 : objB[l] + 1;
      }

      for (let key in objA) {
        if (objA.hasOwnProperty(key) && objA[key] === 2) {
          foundedCopleA++;
        }
      }

      for (let key in objB) {
        if (objB.hasOwnProperty(key) && objB[key] === 2) {
          foundedCopleB++;
        }
      }

      if (foundedCopleA === 2 && foundedCopleB === 2) {
        const charsA = a.split("");
        const charsB = b.split("");
        return checkHighCard(charsA, charsB);
      }
      if (foundedCopleA === 2) {
        return -1;
      }
      if (foundedCopleB === 2) {
        return 1;
      }
    };

    const isNumberOfAKind = (a, b, repetition) => {
      let objA = {};
      let objB = {};
      let foundedA = false;
      let foundedB = false;

      const filteredA = a.split("").filter((char) => char !== "J");
      const filteredB = b.split("").filter((char) => char !== "J");
      const numberOfJollyA = 5 - filteredA.length;
      const numberOfJollyB = 5 - filteredB.length;

      for (let i = 0; i < filteredA.length; i++) {
        let l = filteredA.charAt(i);
        objA[l] = isNaN(objA[l]) ? 1 : objA[l] + 1;
      }

      for (let i = 0; i < filteredB.length; i++) {
        let l = filteredB.charAt(i);
        objB[l] = isNaN(objB[l]) ? 1 : objB[l] + 1;
      }

      for (let key in objA) {
        if (objA.hasOwnProperty(key) && objA[key] + numberOfJollyA === repetition) {
          foundedA = true;
        }
      }

      for (let key in objB) {
        if (objB.hasOwnProperty(key) && objB[key] + numberOfJollyB === repetition) {
          foundedB = true;
        }
      }

      if (foundedA && foundedB) {
        const charsA = a.split("");
        const charsB = b.split("");
        return checkHighCard(charsA, charsB);
      }
      if (foundedA) {
        return -1;
      }
      if (foundedB) {
        return 1;
      }
    };

    function compareHands(a, b) {
      const charsA = a[0].split("");
      const charsB = b[0].split("");
      const isFive = isNumberOfAKind(a[0], b[0], 5);
      if (isFive !== 0 && isFive !== undefined) return isFive;
      const isFour = isNumberOfAKind(a[0], b[0], 4);
      if (isFour !== 0 && isFour !== undefined) return isFour;

      const isThreeAndACouple = isThreeAndCouple(a[0], b[0]);
      if (isThreeAndACouple !== 0 && isThreeAndACouple !== undefined) return isThreeAndACouple;

      const isThree = isNumberOfAKind(a[0], b[0], 3);
      if (isThree !== 0 && isThree !== undefined) return isThree;

      const isADoubleCouple = isDoubleCouple(a[0], b[0]);
      if (isADoubleCouple !== 0 && isADoubleCouple !== undefined) return isADoubleCouple;

      const isTwo = isNumberOfAKind(a[0], b[0], 2);
      if (isTwo !== 0 && isTwo !== undefined) return isTwo;

      return checkHighCard(charsA, charsB);
    }

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const cleanedArray = array.map((row) => row.split(" "));

        const sortedArray = cleanedArray.sort(compareHands);
        const reversed = sortedArray.reverse();
        console.log(reversed);
        let results = [];
        reversed.forEach((element, rank) => {
          results.push(Number(element[1]) * (rank + 1));
        });

        const sum = results.reduce((acc, current) => {
          return Number(acc) + Number(current);
        });

        console.log(results);
        console.log(sum);
      });
  };

  return (
    <>
      <div>Day7</div>
      Part 1: <CButton onClick={calculatePart1}>Calcola</CButton>
      {part1Res && <>{part1Res}</>}
      <p>
        Part 2: <CButton onClick={calculatePart2}>Calcola</CButton>
      </p>
      {part2Res && <>{part2Res}</>}
    </>
  );
}

export default Day7;
