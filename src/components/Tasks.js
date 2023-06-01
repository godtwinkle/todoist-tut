import React, { useEffect, useState } from "react";
import { Checkbox } from "./Checkbox";
import { AddTask } from "./AddTask";
import { useTasks } from "../hooks";
import { collatedTasks } from "../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../helpers";
import { useSelectedProjectValue, useProjectsValue } from "../context";
import { FaPen } from "react-icons/fa";

import { EditTask } from "./EditTask";

export const Tasks = ({showSidebar, setShowSidebar}) => {
  //lua chon project hien tai voi gia tri la (inbox,today,next_7)
  const { selectedProject } = useSelectedProjectValue();

  //lay du lieu cua 1 project
  const { projects } = useProjectsValue();

  //lay task nam trong project nao
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  const [showEditTask, setShowEditTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  //neu co project duoc chon  nam trong cac muc (inbox,today,next 7) thi gan tieu de cua project
  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  //neu khong nam trong cac muc mac dinh (inbox,today,next 7) duoc chon thi gan ten cua project
  if (
    projects &&
    projects.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Việc cần làm`;
  });

  return (
    <div className={showSidebar?"tasks":"tasks__display"} data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={`${task.id}`}>
            <Checkbox id={task.id} taskDesc={task.task} />
            <span>{task.task}</span>

            <div
              className="edit-task__shallow"
              data-testid="show-main-action"
              onClick={() => {
                setEditTaskId(task.id);
                setShowEditTask(!showEditTask);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditTaskId(task.id);
                  setShowEditTask(!showEditTask);
                }
              }}
              tabIndex={0}
              aria-label="Edit task"
              role="button"
            >
              <FaPen />
            </div>

            {showEditTask && editTaskId === task.id && (
              <EditTask showEditTask={showEditTask} taskPram={task} />
            )}
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
};
