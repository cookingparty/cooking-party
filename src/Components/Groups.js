import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Groups = () => {
  const { groups } = useSelector((state) => state);
  return (
    <div>
      <h1>Groups</h1>
      <ul>
        {groups.map((group) => {
          return (
            <li key={group.id}>
              <Link to={`/groups/${group.id}`}>{group.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Groups;
