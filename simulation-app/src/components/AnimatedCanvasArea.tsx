import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';

const AnimatedCanvasArea: React.FC = () => {
  const rectRef = useRef<Konva.Rect>(null);

  useEffect(() => {
    let anim: Konva.Animation | null = null;
  
    if (rectRef.current) {
      anim = new Konva.Animation((frame) => {
        if (rectRef.current && frame) {
          rectRef.current.x(100 + Math.sin(frame.time / 1000) * 100);
          rectRef.current.y(100 + Math.cos(frame.time / 1000) * 100);
        }
      }, rectRef.current.getLayer());
  
      anim.start();
    }
  
    return () => {
      if (anim) {
        anim.stop();
      }
    };
  }, []);

  return (
    <Stage width={window.innerWidth - 200} height={window.innerHeight}>
      <Layer>
        <Rect
          ref={rectRef}
          x={100}
          y={100}
          width={50}
          height={50}
          fill="red"
          draggable
        />
      </Layer>
    </Stage>
  );
};

export default AnimatedCanvasArea;