import React, { useEffect, useRef } from 'react';
import type { IMouseMove, IPath } from './types';

interface Props {
  width: number;
  height: number;
  getDraw: (path: IPath) => void;
  color: string
  data: IPath[] | null;
}

const Canvas: React.FC<Props> = ({width, height, getDraw , color, data}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isActive = false;
    const path: IPath = {
      path: [],
      color
    }

    const context = canvas.getContext('2d');
    if (!context) return;



    const draw = ({x, y}: IMouseMove) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const getDataDraw = ({path, color}: IPath) => {
      context.beginPath();
      context.strokeStyle = color;
      context.moveTo(path[0].x, path[0].y);
      path.forEach((point, index) => {
        if (index > 0) {
          context.lineTo(point.x, point.y);
        }
      });
      context.stroke();
      context.closePath();
    };

    if (data) {
      data.forEach((item) => {
        getDataDraw(item);
      });
    }

    const handleMouseDown = (e: MouseEvent) => {
      isActive = true
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(x, y);
      canvas.addEventListener('mousemove', handleMouseMove);


      function handleMouseMove (e: MouseEvent) {
        if (!canvas) return;
        if (isActive) {
          const x = e.pageX - canvas.offsetLeft;
          const y = e.pageY - canvas.offsetTop;
          path.path.push({x, y});
          draw({x, y});
        }
      }

      const handleMouseUp = () => {
        isActive = false;
        context.closePath();
        getDraw(path);
      };

      canvas.addEventListener('mouseup', handleMouseUp);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
  }, [width, height, color]);

  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} style={{
        border: '1px solid black',
        backgroundColor: '#f9f9f9'
      }}/>
    </>
  )
};

export default Canvas;