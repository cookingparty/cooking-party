import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Cocktails = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Cocktails</h1>
    </div>
  );
};

export default Cocktails;
