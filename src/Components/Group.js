import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addMembership, updateMembership, deleteMembership } from "../store";
import RecipeCard from "./RecipeCard";
import { Button } from "@mui/material";

const Group = () => {
  const { groups, memberships, users, auth, recipes } = useSelector(
    (state) => state
  );
  const { id } = useParams();
  const group = groups.find((g) => g.id === id);
  const dispatch = useDispatch();

  const members = memberships
    .filter((membership) => membership.groupId === id)
    .map((membership) => {
      return users.find((user) => user.id === membership.member_id);
    });

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
        <Button onClick={requestJoin}>Request to Join</Button>
      )}
      {!group.isPrivate && !findMembership(auth.id) && (
        <Button onClick={join}>Join</Button>
      )}
      {findMembership(auth.id).status === "APPROVED" &&
        findMembership(auth.id).role !== "Group Admin" && (
          <Button onClick={() => remove(auth.id)}>Leave Group</Button>
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
                    {user.username || user.facebook_username}
                    <Button onClick={() => approve(user.id)}>approve</Button>
                    <Button onClick={() => remove(user.id)}>reject</Button>
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
                {member.username || member.facebook_username}
                {findMembership(member.id).role === "Group Admin" && (
                  <span> (group admin) </span>
                )}
                {!!findMembership(auth.id) &&
                  findMembership(auth.id).role === "Group Admin" &&
                  findMembership(member.id).role !== "Group Admin" && (
                    <Button onClick={() => remove(member.id)}>
                      remove member
                    </Button>
                  )}
              </li>
            );
          })}
      </ul>
      {findMembership(auth.id).status === "APPROVED" || !group.isPrivate ? (
        <div>
          <h2>Group Recipes:</h2>
          <div className="recipe-grid">
            {recipes
              .filter((recipe) => recipe.groupId === group.id)
              .map((recipe) => {
                return (
                  <RecipeCard
                    key={recipe.id}
                    id={recipe.id}
                    title={recipe.title}
                    subheader={recipe.sourceName}
                    image={recipe.image}
                    description={recipe.description}
                    readyInMinutes={recipe.readyInMinutes}
                    serves={recipe.servings}
                    avatar={"F"}
                    avatarColor={"red"}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <h3>Join group to view group recipes.</h3>
      )}
    </div>
  );
};

export default Group;
