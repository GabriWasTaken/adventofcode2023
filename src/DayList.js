import React from "react";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";

function DayList() {
  const navigate = useNavigate();

  return (
    <>
      <CButton color="primary" onClick={() => navigate(`/1`)}>
        Day 1
      </CButton>
      <CButton color="primary" onClick={() => navigate(`/2`)}>
        Day 2
      </CButton>
      <CButton color="primary" onClick={() => navigate(`/3`)}>
        Day 3
      </CButton>
      <CButton color="primary" onClick={() => navigate(`/4`)}>
        Day 4
      </CButton>
      <CButton color="primary" onClick={() => navigate(`/5`)}>
        Day 5
      </CButton>
      <CButton color="primary" onClick={() => navigate(`/6`)}>
        Day 6
      </CButton>
      <CButton color="primary" onClick={() => navigate(`/7`)}>
        Day 7
      </CButton>
      <CButton color="primary" onClick={() => navigate(`/8`)}>
        Day 8
      </CButton>
      <CButton color="primary" onClick={() => navigate(`/8`)}>
        Day 9
      </CButton>
    </>
  );
}

export default DayList;
