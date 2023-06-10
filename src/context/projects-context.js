import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useProjects } from '../hooks';

//khoi tao context voi Api
export const ProjectsContext = createContext();
export const ProjectsProvider = ({children}) => {
    //tao 1 project
    const {projects,setProjects} = useProjects();
    return (
        //tao ham provider de truyen du lieu cua project
        <ProjectsContext.Provider value={{projects,setProjects}}>      
            {children}
        </ProjectsContext.Provider>
        //cac ham con co the duoc su dung
    );
};

//ProjectContext.Provider co the truy cap du lieu thong qua hook useProjectsValue
export const useProjectsValue = () => useContext(ProjectsContext);

//du lieu cua children phai la node
ProjectsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};