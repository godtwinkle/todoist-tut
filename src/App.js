import React, { useState } from "react";
import PropTypes from "prop-types";
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { SendMessage } from "./components/SendMessage";

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          data-testid="application"
          className={darkMode ? "darkmode" : undefined}
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <Content showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <SendMessage />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};
