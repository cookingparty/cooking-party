import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addMembership } from "../store";

const Group = () => {
  const { groups, memberships, users, auth } = useSelector((state) => state);
  const { id } = useParams();
  const group = groups.find((g) => g.id === id);
  const dispatch = useDispatch();

  const members = memberships
    .filter(
      (membership) =>
        membership.groupId === id && membership.status === "APPROVED"
    )
    .map((membership) => {
      return users.find((user) => user.id === membership.member_id);
    });

  const join = () => {
    dispatch(
      addMembership({ groupId: id, member_id: auth.id, status: "APPROVED" })
    );
  };

  if (!group) {
    return null;
  }

  return (
    <div>
      <h1>{group.name}</h1>
      {!!group.isPrivate && <button>Request to Join</button>}
      {!group.isPrivate && <button onClick={join}>Join</button>}
      <h2>Members:</h2>
      <ul>
        {members.map((member) => {
          return <li key={member.id}>{member.username}</li>;
        })}
      </ul>
    </div>
  );
};

export default Group;
