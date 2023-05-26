import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Meals = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Meals</h1>
    </div>
  );
};

export default Meals;
