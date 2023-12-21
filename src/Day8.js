import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day8Input.txt";

function Day8() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();

  const calculatePart1 = () => {
    let currentNode = { left: "MNJ", right: "VFF" };
    let founded = 0;
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const instructions = array[0].split("");
        let arrayTree = [];
        for (let i = 2; i < array.length; i++) {
          //FCG = (PLG, GXC)
          const nodeName = array[i].substring(0, array[i].indexOf("=") - 1);
          const left = array[i].substring(array[i].indexOf("(") + 1, array[i].indexOf(","));
          const right = array[i].substring(array[i].indexOf(",") + 2, array[i].indexOf(")"));
          arrayTree[nodeName] = {
            left: left,
            right: right,
          };
        }
        let steps = 0;
        console.log("-");
        while (founded === 0) {
          instructions.forEach((i, index) => {
            if (founded === 0) {
              if (i === "L") {
                if (currentNode.left === "ZZZ") {
                  founded = steps + index + 1;
                }
                currentNode = {
                  left: arrayTree[currentNode.left].left,
                  right: arrayTree[currentNode.left].right,
                };
              }
              if (i === "R") {
                if (currentNode.right === "ZZZ") {
                  founded = steps + index + 1;
                }
                currentNode = {
                  left: arrayTree[currentNode.right].left,
                  right: arrayTree[currentNode.right].right,
                };
              }
            }
          });
          console.log("-");
          steps = steps + instructions.length;
        }

        console.log(founded);
        setPart1Res(founded);
      });
  };

  const calculatePart2 = () => {
    let initialArray = [];
    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        const array = text.toString().split("\r\n");
        const instructions = array[0].split("");
        let arrayTree = [];
        for (let i = 2; i < array.length; i++) {
          //FCG = (PLG, GXC)
          const nodeName = array[i].substring(0, array[i].indexOf("=") - 1);
          const left = array[i].substring(array[i].indexOf("(") + 1, array[i].indexOf(","));
          const right = array[i].substring(array[i].indexOf(",") + 2, array[i].indexOf(")"));
          arrayTree[nodeName] = {
            left: left,
            right: right,
          };
          if (nodeName.split("")[2] === "A") {
            initialArray.push({
              left: left,
              right: right,
            });
          }
        }
        console.log("-");
        let Allfounded = [];
        console.log(initialArray);
        initialArray.forEach((start) => {
          let founded = 0;
          let steps = 0;
          while (founded === 0) {
            instructions.forEach((i, index) => {
              if (founded === 0) {
                if (i === "L") {
                  if (start.left.split("")[2] === "Z") {
                    founded = steps + index + 1;
                  }
                  start = {
                    left: arrayTree[start.left].left,
                    right: arrayTree[start.left].right,
                  };
                }
                if (i === "R") {
                  if (start.right.split("")[2] === "Z") {
                    founded = steps + index + 1;
                  }
                  start = {
                    left: arrayTree[start.right].left,
                    right: arrayTree[start.right].right,
                  };
                }
              }
            });
            console.log("-");
            steps = steps + instructions.length;
          }
          Allfounded.push(founded);
        });

        function gcd(a, b) {
          if (b == 0) return a;
          return gcd(b, a % b);
        }

        // Returns LCM of array elements
        function findlcm(arr, n) {
          // Initialize result
          let ans = arr[0];

          // ans contains LCM of arr[0], ..arr[i]
          // after i'th iteration,
          for (let i = 1; i < n; i++) ans = (arr[i] * ans) / gcd(arr[i], ans);

          return ans;
        }

        const answer = findlcm(Allfounded, Allfounded.length);

        console.log(answer);
        setPart2Res(answer);
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

export default Day8;
