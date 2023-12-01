import React from "react";
import { CButton } from "@coreui/react";
import { useNavigate } from "react-router-dom";

function DayList() {
  const navigate = useNavigate();

  return (
    <CButton color="primary" onClick={() => navigate(`/1`)}>
      Day 1
    </CButton>
  );
}

export default DayList;
