    
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
      console.log("hello from console")
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default App;