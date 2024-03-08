import './App.css';
import Canvas from './Canvas.tsx';
import { useState } from 'react';
import { IPath } from './types';
import ColorPicker from './ColorPicker.tsx';

const App = () => {
  const [selectColor, setSelectColor] = useState('#000000');
  const [draw, setDraw] = useState<IPath | null>(null);
  const test: IPath[] = [{
    path: [
      {
        x: 241,
        y: 321
      },
      {
        x: 241,
        y: 320
      },
      {
        x: 242,
        y: 318
      },
      {
        x: 243,
        y: 316
      },
      {
        x: 245,
        y: 315
      },
      {
        x: 249,
        y: 311
      },
      {
        x: 253,
        y: 307
      },
      {
        x: 259,
        y: 301
      },
      {
        x: 264,
        y: 296
      },
      {
        x: 268,
        y: 291
      },
      {
        x: 271,
        y: 287
      },
      {
        x: 274,
        y: 283
      },
      {
        x: 276,
        y: 281
      },
      {
        x: 278,
        y: 280
      },
      {
        x: 279,
        y: 279
      },
      {
        x: 279,
        y: 279
      },
      {
        x: 280,
        y: 279
      },
      {
        x: 280,
        y: 279
      },
      {
        x: 280,
        y: 280
      }
    ],
    color: "#d11595"
  },
    {
      path: [
        {
          x: 422,
          y: 203
        },
        {
          x: 423,
          y: 204
        },
        {
          x: 425,
          y: 207
        },
        {
          x: 427,
          y: 210
        },
        {
          x: 429,
          y: 213
        },
        {
          x: 430,
          y: 215
        },
        {
          x: 430,
          y: 216
        },
        {
          x: 430,
          y: 216
        }
      ],
      color: "#000000"
    }
  ];

  const getDraw = (path: IPath) => {
    setDraw(path);
    console.log(path);
  };

  const handleChangeColor = (color: string) => {
    setSelectColor(color)
  }



  return (
    <>
      <Canvas width={800} height={600} getDraw={getDraw} color={selectColor} data={test}/>
      <ColorPicker onChange={handleChangeColor}/>
    </>
  );
};

export default App;
