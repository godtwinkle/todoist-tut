import React from 'react';
import { Sidebar } from './Sidebar';
import { Tasks } from '../Tasks';

export const Content = ({showSidebar, setShowSidebar}) => (

  <section className="content">
    <Sidebar showSidebar={showSidebar} />
    <Tasks showSidebar={showSidebar}/>
  </section>
);