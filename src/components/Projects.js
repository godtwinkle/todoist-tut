import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelectedProjectValue, useProjectsValue } from '../context';
import { IndividualProject } from './IndividualProject';

export const Projects = ({ activeValue = null }) => {
  // xem la loai project nao dang duoc chon (inbox,today,next_7)
  const [active, setActive] = useState(activeValue);

  //lua chon project hien tai voi gia tri la (inbox,today,next_7)
  const { setSelectedProject } = useSelectedProjectValue();

  //lay du lieu cua 1 project
  const { projects } = useProjectsValue();

  return (
    projects &&
    projects.map((project) => (
      <li
        key={project.projectId}
        data-testid="project-action-parent"
        data-doc-id={project.docId}
        className={
          //khi nhan vao project nao thi se hien thi project do
          active === project.projectId
          ? 'active sidebar__project'
          : 'sidebar__project'
      }
      >
          <div
          role="button"
          data-testid="project-action"
          tabIndex={0}
          //giup trinh doc co the doc cho nguoi mu
          aria-label={`Select ${project.name} as the task project`}
          onClick={() => {
            setActive(project.projectId);
            setSelectedProject(project.projectId);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }
          }}
        >
          <IndividualProject project={project} />
        </div>
      </li>
    ))
  );
};

Projects.propTypes = {
    activeValue: PropTypes.bool,
};