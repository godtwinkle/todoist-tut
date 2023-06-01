import React, { useState } from "react";
import { FaPizzaSlice, FaRegChartBar,FaBars } from "react-icons/fa";
import PropTypes from "prop-types";
import { AddTask } from "../AddTask";
import { Search } from "./Search";
import { Statistical } from "../Statistical";
export const Header = ({ darkMode, setDarkMode, showSidebar, setShowSidebar}) => {
  //hien thi hay khong voi quick add task
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const [showStatistical, setShowStatistical] = useState(false);

  
  return (
    <header className="header" data-testid="header">
      <nav>

        <div className="bars" onClick={()=>setShowSidebar(!showSidebar)}>
         <FaBars/>
        </div>

        <div className="logo">
          <img src="/images/logo.png" alt="Todoist" />
        </div>

        <Search />

        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task"
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                aria-label="Darkmode on/off"
                type="button"
                onClick={() => setDarkMode(!darkMode)}
              >
                <FaPizzaSlice />
              </button>
            </li>

            <li className="settings__statical">
              <button
                data-testid="statical-data-action"
                aria-label="Statical data"
                type="button"
                onClick={() => {
                  setShowStatistical(!showStatistical);
                }}
              >
                <FaRegChartBar />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />

      <Statistical
        showStatistical={showStatistical}
        setShowStatistical={setShowStatistical}
      />
    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
};
