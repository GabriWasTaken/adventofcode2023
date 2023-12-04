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
    </>
  );
}

export default DayList;
