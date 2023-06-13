import React, { useState } from "react";
import PropTypes from "prop-types";
import { useProjectsValue } from "../context";

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  //lay cac gia tri cua project duoi dang JSON
  const { projects } = useProjectsValue();
  const [active, setActive] = useState(projects);

  return (
    projects &&
    showProjectOverlay && (
      <div className="project-overlay" data-testid="project-overlay">
        <ul className="project-overlay__list">
          <li key="INBOX" className={active === "INBOX" ? "active" : undefined}>
            <div
              data-testid="project-overlay-action"
              onClick={() => {
                setActive("INBOX");
                setProject("INBOX");
                setShowProjectOverlay(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setActive("INBOX");
                  setProject("INBOX");
                  setShowProjectOverlay(false);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Select the task project"
            >
              <div className="project-overlay__name">Hộp nhiệm vụ</div>
            </div>
          </li>

          {projects.map((project) => (
            <li
              key={project.projectId}
              className={active === project.projectId ? "active" : undefined}
            >
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  setActive(project.projectId);
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setActive(project.projectId);
                    setProject(project.projectId);
                    setShowProjectOverlay(false);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Select the task project"
              >
                <span className="project-overlay__dot">•</span>
                <span className="project-overlay__name">{project.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

ProjectOverlay.propTypes = {
  projects: PropTypes.array,
};
