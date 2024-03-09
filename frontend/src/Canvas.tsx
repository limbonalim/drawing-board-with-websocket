import React, { useCallback, useEffect, useRef } from 'react';
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
  const drawPath = useRef<IPath>({path: [], color});
  const isActive = useRef<boolean>(false);

  const draw = useCallback(({x, y}: IMouseMove) => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineTo(x, y);
    context.stroke();
  }, []);

  const handleMouseUp = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    isActive.current = false;
    context.stroke();
    context.closePath();
    getDraw(drawPath.current);
    drawPath.current.path = [];
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    if (isActive.current) {
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      drawPath.current.path.push({x, y});
      draw({x, y});
    }
  }, []);

  const handleMouseDown = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    isActive.current = true;
    context.strokeStyle = color;
    drawPath.current.color = color;
    context.beginPath();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
  }, [color]);

  const getDataDraw = useCallback(({path, color}: IPath) => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

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
  }, [data]);



  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.addEventListener('mousedown', handleMouseDown);
  }, [width, height, color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    if (data) {
      data.forEach((item) => {
        getDataDraw(item);
      });
    }
  }, [data, getDataDraw]);

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