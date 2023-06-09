import React, { useState } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { Projects } from "../Projects";
import { useSelectedProjectValue } from "../../context";
import { AddProject } from "../AddProject";

export const Sidebar = ({showSidebar}) => {
  //lua chon project hien tai voi gia tri la (inbox,today,next_7)
  const { setSelectedProject } = useSelectedProjectValue();
  //khi nhan vao project nao thi se active project do
  const [active, setActive] = useState("inbox");

  //dat trang thai show hay khong voi project
  const [showProjects, setShowProjects] = useState(true);

  return (
      <div className={showSidebar ? "sidebar":"sidebar__display"} data-testid="sidebar">
        <ul className="sidebar__generic">
          <li
            data-testid="inbox"
            className={active === "inbox" ? "active" : undefined}
          >
            <div
              data-testid="inbox-action"
              //giup trinh doc co the doc cho nguoi mu
              aria-label="Show inbox tasks"
              tabIndex={0}
              role="button"
              onClick={() => {
                setActive("inbox");
                setSelectedProject("INBOX");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActive("inbox");
                  setSelectedProject("INBOX");
                }
              }}
            >
              <span>
                <FaInbox />
              </span>
              <span>Hộp nhiệm vụ</span>
            </div>
          </li>
          <li
            data-testid="today"
            className={active === "today" ? "active" : undefined}
          >
            <div
              data-testid="today-action"
              //giup trinh doc co the doc cho nguoi mu
              aria-label="Show today's tasks"
              tabIndex={0}
              role="button"
              onClick={() => {
                setActive("today");
                setSelectedProject("TODAY");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActive("today");
                  setSelectedProject("TODAY");
                }
              }}
            >
              <span>
                <FaRegCalendar />
              </span>
              <span>Hôm nay</span>
            </div>
          </li>
          <li
            data-testid="next_7"
            className={active === "next_7" ? "active" : undefined}
          >
            <div
              data-testid="next_7-action"
              //giup trinh doc co the doc cho nguoi mu
              aria-label="Show tasks for the next 7 days"
              tabIndex={0}
              role="button"
              onClick={() => {
                setActive("next_7");
                setSelectedProject("NEXT_7");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActive("next_7");
                  setSelectedProject("NEXT_7");
                }
              }}
            >
              <span>
                <FaRegCalendarAlt />
              </span>
              <span>7 ngày tới</span>
            </div>
          </li>
        </ul>
        <div
          className="sidebar__middle"
          //giup trinh doc co the doc cho nguoi mu
          aria-label="Show/hide projects"
          onClick={() => setShowProjects(!showProjects)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setShowProjects(!showProjects);
          }}
          role="button"
          tabIndex={0}
        >
          <span>
            <FaChevronDown
              className={!showProjects ? "hidden-projects" : undefined}
            />
          </span>
          <h2>Dự án</h2>
        </div>

        <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

        {showProjects && <AddProject />}
      </div>
    
  );
};
