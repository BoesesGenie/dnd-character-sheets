import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import CharacterSheetsList from './Presentation/CharacterSheet/CharacterSheetsList';
import Edit from './Presentation/CharacterSheet/Edit';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sheet/:characterSheetId?">
          <Edit />
        </Route>
        <Route path="/">
          <CharacterSheetsList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
