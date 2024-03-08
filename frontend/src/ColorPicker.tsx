import React, { useState } from 'react';

interface Props {
  onChange: (color: string) => void;
}

const ColorPicker:React.FC<Props> = ({onChange}) => {
  const [color, setColor] = useState('#000000');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  return <input type="color" value={color} onChange={handleChange}/>;
};

export default ColorPicker;