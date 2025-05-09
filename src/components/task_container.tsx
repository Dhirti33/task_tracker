import "./Layout.css"
import React, { useState, useRef } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { DragItem, DropZone, Draggable } from './drag_drop';



const TaskContainer: React.FC = () => {
  const [grid1Items, setGrid1Items] = useState<DragItem[]>([
    { id: 1, text: 'Item 1', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', date: '2023-10-01' },
    { id: 2, text: 'Item 2', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', date: '2023-10-02' },
  ]);
  const [grid2Items, setGrid2Items] = useState<DragItem[]>([]);
  const [grid3Items, setGrid3Items] = useState<DragItem[]>([]);
  const [grid4Items, setGrid4Items] = useState<DragItem[]>([]);
  const [open, setOpen] = useState(false)

  // Use refs for input fields
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleDrop = (
    item: DragItem,
    setTargetGrid: React.Dispatch<React.SetStateAction<DragItem[]>>,
    sourceGrid: DragItem[],
    setSourceGrid: React.Dispatch<React.SetStateAction<DragItem[]>>
  ) => {
    //Add to target grid
    setTargetGrid((prev) => [...prev, item]);
    //Remove from source grid
    setSourceGrid((prev) => prev.filter((dragItem) => dragItem.id !== item.id));
  };

  const show = () => {
    setOpen(!open)
  }

  const handleAddTask = () => {
    const title = titleRef.current?.value?.trim();
    const description = descriptionRef.current?.value?.trim();
    const date = dateRef.current?.value;
  
    if (!title || !description || !date) {
      alert('Please fill out all fields');
      return;
    }
  
    const newItem: DragItem = {
      id: Date.now(),
      text: title,
      description,
      date,
    };
  
    setGrid1Items((prev) => [...prev, newItem]);
    setOpen(false);
  
    // Clear fields
    [titleRef, descriptionRef, dateRef].forEach(ref => {
      if (ref.current) ref.current.value = '';
    });
  };
  


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-container w-full grid grid-cols-4 divide-x divide-gray-700">
        <div className="story-container flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">User Story:</h2>
          <div className="Card-container  w-full flex flex-col gap-1">
            {grid1Items.map((item) => (
              <Draggable key={item.id} id={item.id} text={item.text} description={item.description} date={item.date} />
            ))}
          </div>
          <button className="AddStory bg-gray-950 text-white p-2 rounded-lg hover:bg-gray-700 transition-all ease-in duration-300" onClick={show}>
            <i className="bi bi-plus-lg"></i>
            <span className="text-lg font-bold">Add Task</span>
          </button>
        </div>
        <div className="grid-column flex flex-col items-center p-4">
          <h2 className="text-3xl font-bold mb-4">To do:</h2>
          <DropZone
            dropItems={grid2Items}
            onDrop={(item) =>
              handleDrop(item, setGrid2Items, grid1Items, setGrid1Items)
            }
          />
        </div>
        <div className="grid-column flex flex-col items-center p-4">
          <h2 className="text-3xl font-bold mb-4">In progress:</h2>
          <DropZone
            dropItems={grid3Items}
            onDrop={(item) =>
              handleDrop(item, setGrid3Items, grid2Items, setGrid2Items)
            }
          />
        </div>
        <div className="grid-column flex flex-col items-center p-4">
          <h2 className="text-3xl font-bold mb-4">Done:</h2>
          <DropZone
            dropItems={grid4Items}
            onDrop={(item) =>
              handleDrop(item, setGrid4Items, grid3Items, setGrid3Items)
            }
          />
        </div>
        {open && (
          <div className="newTask bg-gray-800 p-4 rounded z-50">
            <input
              type="text"
              name="name"
              id="Title"
              placeholder="Task Title"
              ref={titleRef}
              className="mb-2 p-2 w-full rounded"
            />
            <input
              type="text"
              name="description"
              id="Desc"
              placeholder="Task Description"
              ref={descriptionRef}
              className="mb-2 p-2 w-full rounded"
            />
            <input
              type="date"
              name="date"
              id="Date"
              ref={dateRef}
              className="mb-2 p-2 w-full rounded"
            />
            <button
              className="bg-gray-950 text-white p-2 rounded hover:bg-gray-700 transition-all " id="newBtn"
              onClick={handleAddTask}
              >
                Add Task
            </button>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default TaskContainer;
