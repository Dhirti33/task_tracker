import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import "./Layout.css";
import SideMenu from './side_menu.tsx';
import TaskContainer from './task_container.tsx';

const FullScreenLayout = () => {
  return (
    <div className="Task-Tracker-Container flex flex-row overflow-hidden">
      <div className="head w-11/12 p-5 border-b-2 border-gray-500 flex flex-row justify-between items-center">
            <div className="kanban">
              <h1 className="text-3xl font-bold text-white">Kanban Board</h1>
            </div>
      </div>
      {/* Start Sidebar */}
      <div className="side">
        <SideMenu />
      </div>
      {/* End Sidebar */}

      {/* Main Content */}
      <DndProvider backend={HTML5Backend}>
        <main className="tracker-container flex flex-col flex-1 gap-9 items-center">
          
          <Routes>
            {/* Define routes here */}
            <Route path="/" element={<h1>Welcome to the Dashboard</h1>} />
            <Route path="/task-tracker" element={<TaskContainer />} />
          </Routes>
        </main>
      </DndProvider>
    </div>
  );
};

export default FullScreenLayout;