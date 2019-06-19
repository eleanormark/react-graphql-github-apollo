    
import React, { useEffect } from 'react';
import Profile from '../Profile';

function App() {
  useEffect(() => {
      console.log("hello from console")
  }, []);

  return (
    <Profile />
  );
}

export default App;