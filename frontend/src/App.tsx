import './App.css';
import Canvas from './Canvas.tsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IPath } from './types';
import ColorPicker from './ColorPicker.tsx';

const App = () => {
  const [selectColor, setSelectColor] = useState('#000000');
  const [allDraws, setAllDraws] = useState<IPath[]>([]);
  const ws = useRef<WebSocket | null>(null);


  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/drawing');

    ws.current.onclose = () => console.log('ws closed');

    ws.current.onmessage = (event) => {
      const decodedDraw = JSON.parse(event.data) as IPath;
      setAllDraws(prev => [...prev, decodedDraw]);
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    }
  }, []);

  const getDraw = useCallback((path: IPath) => {
    if (!ws.current) return;
    ws.current.send(JSON.stringify(path));
  },[]);

  const handleChangeColor = useCallback((color: string) => {
    setSelectColor(color)
  }, []);



  return (
    <>
      <Canvas width={800} height={600} getDraw={getDraw} color={selectColor} data={allDraws}/>
      <ColorPicker onChange={handleChangeColor}/>
    </>
  );
};

export default App;
