import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Circle, Line, Group, Text } from 'react-konva';
import Konva from 'konva';

interface ShapeProps {
  id: string;
  x: number;
  y: number;
  type: string;
}

const CanvasArea: React.FC = () => {
  const [shapes, setShapes] = useState<ShapeProps[]>([]);
  const stageRef = useRef<Konva.Stage>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const type = e.dataTransfer.getData('application/reactflow');
    const stage = stageRef.current;
    
    if (stage) {
      stage.setPointersPositions(e);
      const mousePos = stage.getPointerPosition();

      if (mousePos) {
        const id = `${type}-${shapes.length}`;
        setShapes([...shapes, { id, x: mousePos.x, y: mousePos.y, type }]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleShapeClick = (id: string) => {
    alert(`Clicked shape with ID: ${id}`);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ flex: 1, background: '#e4e4e4', position: 'relative' }}
    >
      <Stage width={window.innerWidth - 200} height={window.innerHeight} ref={stageRef}>
        <Layer>
          {shapes.map(shape => {
            let element;
            switch (shape.type) {
              case 'Product':
                element = <Rect x={0} y={0} width={50} height={50} fill="red" draggable onClick={() => handleShapeClick(shape.id)} />;
                break;
              case 'Source':
                element = <Circle x={25} y={25} radius={25} fill="blue" draggable onClick={() => handleShapeClick(shape.id)} />;
                break;
              case 'Queue':
                element = <Rect x={0} y={0} width={50} height={50} fill="green" draggable onClick={() => handleShapeClick(shape.id)} />;
                break;
              case 'Server':
                element = <Rect x={0} y={0} width={50} height={50} fill="purple" draggable onClick={() => handleShapeClick(shape.id)} />;
                break;
              case 'Sink':
                element = <Circle x={25} y={25} radius={25} fill="orange" draggable onClick={() => handleShapeClick(shape.id)} />;
                break;
              case 'Node':
                element = <Line points={[0, 0, 50, 50]} stroke="black" draggable onClick={() => handleShapeClick(shape.id)} />;
                break;
              default:
                element = null;
            }
            return (
              <Group key={shape.id} x={shape.x} y={shape.y}>
                {element}
              </Group>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasArea;
