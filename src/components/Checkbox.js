import React from "react";
import PropTypes from "prop-types";
import { firebase } from "../firebase";

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = () => {
    //update archived thanh true trong tasks
    firebase.firestore().collection("tasks").doc(id).update({
      archived: true,
    });
  };
  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === "Enter") archiveTask();
      }}
      //giup trinh doc co the doc cho nguoi mu
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
