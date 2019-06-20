import React, { useEffect } from 'react';
import Profile from '../Profile';
import  { Container, Tab } from 'semantic-ui-react';

const  panes = [
  { menuItem: {key: 'star', icon: 'star', content: 'Starred Repo'}, render: () => <Tab.Pane> <Profile /></Tab.Pane> },
  { menuItem: {key: 'search', icon: 'search', content:'Search'}, render: () => <Tab.Pane> Find Repos </Tab.Pane> },

]

function App() {
  useEffect(() => {
      console.log("hello from console")
  }, []);

  return (
    <Container >
          <h1>Star Spangled Repos</h1>
          <Tab panes={panes} />
    </Container>

  );
}

export default App;