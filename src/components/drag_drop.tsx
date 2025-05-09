import './Layout.css'
import { useDrag, useDrop, DndProvider, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';


const DRAG_TYPE = 'ITEM';

export interface DragItem {
  id: number;
  text: string;
  description?: string;
  date?: string;
}

export interface DraggableProps {
  id: number;
  text: string;
  description?: string;
  date?: string;
}

export interface DropZoneProps {
    dropItems: DragItem[];
    onDrop: (item: DragItem) => void;
  }

export const Draggable: React.FC<DraggableProps> = ({ id, text, description, date }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAG_TYPE,
    item: { id, text, description, date }, // Pass the full item object
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [id, text, description, date]);

  return (
    <div
      ref={drag}
      className="draggable-item w-full p-2 rounded bg-gray-950 cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="storyCard w-full flex flex-col gap-2 p-2 rounded justify-between shadow-gray-200">
        <div className="storyCardHead text-2xl font-bold">{text}</div>
        <div className="storyCardBody text-sm">{description}</div>
        <div className="storyCardDate">{date}</div>
      </div>
    </div>
  );
};



export const DropZone: React.FC<DropZoneProps> = ({ dropItems, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: DRAG_TYPE,
    drop: (item: DragItem) => {
      onDrop(item);
      return item;
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [dropItems]);

  return (
    <div
      ref={drop}
      className="drop-zone w-full flex flex-col transition-all overflow-y-auto"
    >
      {dropItems.length > 0 ? (
        dropItems.map((item) => (
          <Draggable
            key={item.id}
            id={item.id}
            text={item.text}
            description={item.description}
            date={item.date}
          />
        ))
      ) : (
        <p className="text-gray-500">Drop items here</p>
      )}
    </div>
  );
};