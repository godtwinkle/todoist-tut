import React, { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";
import { useProjectsValue, useSelectedProjectValue } from "../context";
import { firebase } from "../firebase";
import { useTasks } from "../hooks";

export const IndividualProject = ({ project }) => {
  //xem co show phan xac nhan delete hay khong
  const [showConfirm, setShowConfirm] = useState(false);

  const { projects, setProjects } = useProjectsValue();
  const [projectName, setProjectName] = useState(project.name);

  //lay du lieu cua 1 project
  const { setSelectedProject } = useSelectedProjectValue();

  const { tasks } = useTasks(project.projectId);

  const deleteProject = (deleteProject) => {
    tasks.forEach((task) => {
      if (task.projectId === deleteProject.projectId) {
        firebase.firestore().collection("tasks").doc(task.id).update({
          projectId: "INBOX",
        });
      }
    });

    firebase
      .firestore()
      .collection("projects")
      .doc(deleteProject.docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("INBOX");
      });
  };

  const editProject = () =>
    projectName &&
    firebase
      .firestore()
      .collection("projects")
      .doc(project.docId)
      .update({
        name: projectName,
        userId: "EQDzlniTwHc9sEzeWbaN",
      })
      .then(() => {
        setProjects([...projects]);
      });

  return (
    <>
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShowConfirm(!showConfirm);
        }}
        tabIndex={0}
        role="button"
        //giup trinh doc co the doc cho nguoi mu
        aria-label="Confirm deletion of project"
      >
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Bạn có muốn xoá dự án này không?</p>
              <button type="button" onClick={() => deleteProject(project)}>
                Xoá
              </button>

              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                role="button"
                //giup trinh doc co the doc cho nguoi mu
                aria-label="Cancel adding project, do not delete"
              >
                Huỷ
              </span>
            </div>
          </div>
        )}
      </span>

      <span
        className="sidebar__project-edit"
        data-testid="edit-project"
        tabIndex={1}
        role="button"
        //giup trinh doc co the doc cho nguoi mu
        aria-label="Edit of project"
      >
        <FaPen />

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
            onClick={() => editProject()}
            data-testid="add-project-submit"
          >
            Sửa dự án
          </button>
        </div>
      </span>
    </>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.object.isRequired,
};
