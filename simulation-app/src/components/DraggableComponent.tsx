// src/components/CanvasArea.tsx
import React, { useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';

interface DraggableComponentProps {
  id: string;
  x: number;
  y: number;
  onDragEnd: (id: string, x: number, y: number) => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ id, x, y, onDragEnd }) => {
  return (
    <Rect
      x={x}
      y={y}
      width={50}
      height={50}
      fill="blue"
      draggable
      onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
    />
  );
};

const CanvasArea: React.FC = () => {
  const [components, setComponents] = useState<{ id: string, x: number, y: number }[]>([
    { id: '1', x: 100, y: 100 },
    { id: '2', x: 200, y: 200 },
  ]);

  const handleDragEnd = (id: string, x: number, y: number) => {
    setComponents(components.map(comp => (comp.id === id ? { ...comp, x, y } : comp)));
  };

  return (
    <Stage width={window.innerWidth - 200} height={window.innerHeight}>
      <Layer>
        {components.map(comp => (
          <DraggableComponent
            key={comp.id}
            id={comp.id}
            x={comp.x}
            y={comp.y}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasArea;