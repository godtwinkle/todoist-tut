import React, { useState } from "react";
import PropTypes from "prop-types";
import { firebase } from "../firebase";
import { generatePushId } from "../helpers";
import { useProjectsValue } from "../context";

export const AddProject = ({ shouldShow = false }) => {
  //dat trang thai hien thi cho add project
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  //tao ngau nhien id cho project
  const projectId = generatePushId();

  //lay du lieu cua 1 project
  const { projects, setProjects } = useProjectsValue();

  const addProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection("projects")
      .add({
        projectId,
        name: projectName,
        userId: "EQDzlniTwHc9sEzeWbaN",
      })
      .then(() => {
        setProjects([...projects]);
        setProjectName("");
        setShow(false);
      });

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Tên dự án"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Thêm dự án
          </button>
          <span
            //giup trinh doc co the doc cho nguoi mu
            aria-label="Cancel adding project"
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShow(false);
            }}
            role="button"
            tabIndex={0}
          >
            Huỷ
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        //giup trinh doc co the doc cho nguoi mu
        aria-label="Add Project"
        data-testid="add-project-action"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShow(!show);
        }}
        role="button"
        tabIndex={0}
      >
        Thêm dự án
      </span>
    </div>
  );
};

AddProject.propTypes = {
  shouldShow: PropTypes.bool,
};
