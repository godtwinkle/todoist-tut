import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import moment from "moment";
import PropTypes from "prop-types";
import { firebase } from "../firebase";
import { useSelectedProjectValue } from "../context";
import { ProjectOverlay } from "./ProjectOverlay";
import { TaskDate } from "./TaskDate";

export const EditTask = ({ showEditTask,setShowEditTask, taskPram }) => {
  //xu ly ten task
  const [task, setTask] = useState(taskPram.task);
  // xu ly ngay tao task
  const [taskDate, setTaskDate] = useState("");

  //xu ly task nam trong project nao
  const [project, setProject] = useState("");

  //xem co show phan edit task hay khong

  //hien thi hay khong voi danh sach project
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);

  //hien thi nut chon ngay cua task
  const [showTaskDate, setShowTaskDate] = useState(false);

  //lua chon project hien tai voi gia tri la (inbox,today,next_7)
  const { selectedProject } = useSelectedProjectValue();


  const editTask = () => {
    //lay project id cua project hien tai
    const projectId = project || selectedProject;
    let collatedDate = "";
    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }
    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection("tasks")
        .doc(taskPram.id)
        .update({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: "EQDzlniTwHc9sEzeWbaN",
        })
        .then(() => {
          setTask(task);
          setProject(project);
          setTaskDate(taskDate);
          setShowEditTask(false);
          setShowTaskDate(false);
          setShowProjectOverlay(false);
        })
    );
  };



  return (
    <div className="add-task" data-testid="add-task-comp">
      {showEditTask && (

        <div className="add-task__main" data-testid="add-task-main">
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            aria-label="Enter your task"
            data-testid="add-task-content"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() => editTask()}
          >
            Sửa nhiệm vụ
          </button>

          <span
            className="add-task__cancel"
            data-testid="add-task-main-cancel"
            onClick={() => {
              setShowEditTask(false);
              setShowTaskDate(false);
              setShowProjectOverlay(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowEditTask(false);
                setShowTaskDate(false);
                setShowProjectOverlay(false);
              }
            }}
            aria-label="Cancel adding a task"
            tabIndex={0}
            role="button"
          >
            Huỷ
          </span>

          <span
            className="add-task__project"
            data-testid="show-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowProjectOverlay(!showProjectOverlay);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowTaskDate(!showTaskDate);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}     
    </div>
  );
};

EditTask.propTypes = {
  showEditTaskMain: PropTypes.bool,
  shouldShowMain: PropTypes.bool,
  showQuickEditTask: PropTypes.bool,
  setShowQuickEditTask: PropTypes.func,
};
