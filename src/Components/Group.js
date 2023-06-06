import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addMembership, updateMembership, deleteMembership } from "../store";

const Group = () => {
  const { groups, memberships, users, auth } = useSelector((state) => state);
  const { id } = useParams();
  const group = groups.find((g) => g.id === id);
  const dispatch = useDispatch();

  const members = memberships
    .filter((membership) => membership.groupId === id)
    .map((membership) => {
      return users.find((user) => user.id === membership.member_id);
    });

  console.log("members are", members);

  const findMembership = (userId) => {
    const membership = memberships.find(
      (membership) =>
        membership.member_id === userId && membership.groupId === id
    );
    if (!!membership) {
      return membership;
    }
    return false;
  };

  const join = () => {
    dispatch(
      addMembership({ groupId: id, member_id: auth.id, status: "APPROVED" })
    );
  };

  const requestJoin = () => {
    dispatch(
      addMembership({ groupId: id, member_id: auth.id, status: "PENDING" })
    );
  };

  const approve = (id) => {
    const membershipId = findMembership(id).id;
    dispatch(
      updateMembership({ membershipId, status: "APPROVED" }, membershipId)
    );
  };

  const reject = (id) => {
    const membershipId = findMembership(id).id;
    dispatch(
      updateMembership({ membershipId, status: "DENIED" }, membershipId)
    );
  };

  const remove = (id) => {
    const membershipId = findMembership(id).id;
    dispatch(deleteMembership(membershipId));
  };

  if (!group) {
    return null;
  }

  return (
    <div>
      <h1>{group.name}</h1>
      {!!group.isPrivate && !findMembership(auth.id) && (
        <button onClick={requestJoin}>Request to Join</button>
      )}
      {!group.isPrivate && !findMembership(auth.id) && (
        <button onClick={join}>Join</button>
      )}
      {!!findMembership(auth.id) &&
        findMembership(auth.id).role === "Group Admin" && (
          <div>
            <h2>Join Requests</h2>
            {members
              .filter((user) => findMembership(user.id).status === "PENDING")
              .map((user) => {
                return (
                  <li key={user.id}>
                    {user.username}
                    <button onClick={() => approve(user.id)}>approve</button>
                    <button onClick={() => reject(user.id)}>reject</button>
                  </li>
                );
              })}
          </div>
        )}
      <h2>Members:</h2>
      <ul>
        {members
          .filter((member) => findMembership(member.id).status === "APPROVED")
          .map((member) => {
            return (
              <li key={member.id}>
                {member.username}
                {findMembership(member.id).role === "Group Admin" && (
                  <span> (group admin) </span>
                )}
                {!!findMembership(auth.id) &&
                  findMembership(auth.id).role === "Group Admin" && (
                    <button onClick={() => remove(member.id)}>
                      remove member
                    </button>
                  )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Group;
