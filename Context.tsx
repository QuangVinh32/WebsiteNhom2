import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Context = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return null;
  }

  return (
    <div className={context.theme}>
      <span>Anh đi về phía mặt trời... <br />
            nào ngờ anh thích năng... <br />
            ai mua mà bán... <br />
      </span>
    </div>
  );
};

export default Context;
