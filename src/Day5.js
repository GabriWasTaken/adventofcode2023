import React, { useState } from "react";
import { CButton } from "@coreui/react";
import raw from "./assets/day5Input.txt";

function Day5() {
  const [part1Res, setPart1Res] = useState();
  const [part2Res, setPart2Res] = useState();

  const calculatePart1 = () => {
    const mapping = (baseText, searchString) => {
      let map = [];
      if (baseText.toString().includes(searchString)) {
        map = baseText
          .toString()
          .substring(
            baseText.toString().indexOf(searchString) + searchString.length + 1,
            baseText.toString().indexOf("\r\n\r\n")
          )
          .split("\r\n");
      }
      map = map.map((row) => row.split(" "));
      return map;
    };

    const seedToSoil = (seeds, firstMap) => {
      let soils = [];
      seeds.map((seed) => {
        let founded = false;
        firstMap.map((eachMatch) => {
          if (Number(seed) >= Number(eachMatch[1]) && Number(seed) <= Number(eachMatch[1]) + Number(eachMatch[2])) {
            soils.push(Number(seed) - Number(eachMatch[1]) + Number(eachMatch[0]));
            founded = true;
          }
        });
        if (founded === false) {
          soils.push(Number(seed));
        }
      });
      return soils;
    };

    let seedsArray = [];
    let firstMap = [];
    let secondMap = [];
    let thirdMap = [];
    let fourthMap = [];
    let fifthMap = [];
    let sixMap = [];
    let sevenMap = [];

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        if (text.toString().includes("seeds:")) {
          seedsArray = text.toString().substring(7, text.toString().indexOf("\r\n")).split(" ");
        }
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        firstMap = mapping(text.toString(), "seed-to-soil map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        secondMap = mapping(text.toString(), "soil-to-fertilizer map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        thirdMap = mapping(text.toString(), "fertilizer-to-water map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        fourthMap = mapping(text.toString(), "water-to-light map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        fifthMap = mapping(text.toString(), "light-to-temperature map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        sixMap = mapping(text.toString(), "temperature-to-humidity map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        if (text.toString().includes("humidity-to-location map:")) {
          sevenMap = text
            .toString()
            .substring(
              text.toString().indexOf("humidity-to-location map:") + "humidity-to-location map:".length + 1,
              text.toString().lenght
            )
            .split("\r\n");
        }
        sevenMap = sevenMap.map((row) => row.split(" "));

        const soils = seedToSoil(seedsArray, firstMap);
        const fertilizer = seedToSoil(soils, secondMap);
        const water = seedToSoil(fertilizer, thirdMap);
        const light = seedToSoil(water, fourthMap);
        const temperature = seedToSoil(light, fifthMap);
        const humidity = seedToSoil(temperature, sixMap);
        const location = seedToSoil(humidity, sevenMap);

        console.log(Math.min(...location));
      });
  };

  const calculatePart2 = () => {
    let min = 9999999999;

    const mapping = (baseText, searchString) => {
      let map = [];
      if (baseText.toString().includes(searchString)) {
        map = baseText
          .toString()
          .substring(
            baseText.toString().indexOf(searchString) + searchString.length + 2,
            baseText.toString().indexOf("\r\n\r\n")
          )
          .split("\r\n");
      }
      map = map.map((row) => row.split(" "));
      return map;
    };

    const seedToSoil = (seed, firstMap) => {
      let soil;
      let founded = false;
      firstMap.forEach((eachMatch) => {
        if (Number(seed) >= Number(eachMatch[1]) && Number(seed) < Number(eachMatch[1]) + Number(eachMatch[2])) {
          soil = Number(seed) - Number(eachMatch[1]) + Number(eachMatch[0]);
          founded = true;
          return null;
        }
      });
      if (founded === false) {
        soil = Number(seed);
      }
      return soil;
    };

    let seedsArray = [];
    let firstMap = [];
    let secondMap = [];
    let thirdMap = [];
    let fourthMap = [];
    let fifthMap = [];
    let sixMap = [];
    let sevenMap = [];

    fetch(raw)
      .then((r) => r.text())
      .then((text) => {
        if (text.toString().includes("seeds:")) {
          seedsArray = text.toString().substring(7, text.toString().indexOf("\r\n")).split(" ");
        }
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        firstMap = mapping(text.toString(), "seed-to-soil map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        secondMap = mapping(text.toString(), "soil-to-fertilizer map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        thirdMap = mapping(text.toString(), "fertilizer-to-water map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        fourthMap = mapping(text.toString(), "water-to-light map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        fifthMap = mapping(text.toString(), "light-to-temperature map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        sixMap = mapping(text.toString(), "temperature-to-humidity map:");
        text = text.toString().substring(text.toString().indexOf("\r\n\r\n") + 1, text.lenght);

        if (text.toString().includes("humidity-to-location map:")) {
          sevenMap = text
            .toString()
            .substring(
              text.toString().indexOf("humidity-to-location map:") + "humidity-to-location map:".length + 2,
              text.toString().lenght
            )
            .split("\r\n");
        }
        sevenMap = sevenMap.map((row) => row.split(" "));

        seedsArray.forEach((seed, index) => {
          if (index % 2 === 0) {
            console.log(index);
            for (let i = 0; i < seedsArray[index + 1]; i++) {
              const soil = seedToSoil(Number(seed) + i, firstMap);
              const fertilizer = seedToSoil(soil, secondMap);

              const water = seedToSoil(fertilizer, thirdMap);

              const light = seedToSoil(water, fourthMap);

              const temperature = seedToSoil(light, fifthMap);

              const humidity = seedToSoil(temperature, sixMap);

              const location = seedToSoil(humidity, sevenMap);

              if (min > location) {
                min = location;
              }
            }
          }
        });
        console.log("-------------------------");
        console.log("completed: ", min);
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

export default Day5;
