import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

//khoi tao context voi Api
export const SelectedProjectContext = createContext();


export const SelectedProjectProvider = ({children}) => {
    //tao state (inbox) cho project duoc chon
    const [selectedProject,setSelectedProject] = useState('INBOX');
    return (
        //tao ham provider de truyen du lieu cua project
        <SelectedProjectContext.Provider value={{selectedProject,setSelectedProject}}>
           
            {children}
        </SelectedProjectContext.Provider>
        //cac ham con co the duoc su dung
    );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
SelectedProjectProvider.propTypes = {
    children: PropTypes.node.isRequired,
};