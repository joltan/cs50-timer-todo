import { useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import SettingsContext from './components/SettingsContext';

// layouts and pages

import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import Settings from './components/Settings';


// router and routes

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  )
)


function App() {

  const [sprintMin, setSprintMin] = useState(25);
  const [longMin, setLongMin] = useState(15);
  const [shortMin, setShortMin] = useState(5);
  const [longFrequency, setLongFrequency] = useState(4);
  const [totalCycles, setTotalCycles] = useState(8);
  const [taskMode, setTaskMode] = useState(true);

  return (
    <SettingsContext.Provider value={{
        sprintMin,
        setSprintMin,
        shortMin,
        setShortMin,
        longMin,
        setLongMin,
        longFrequency,
        setLongFrequency,
        totalCycles,
        setTotalCycles,
        taskMode,
        setTaskMode
     }
    }>
      <RouterProvider router={router}/>
    </SettingsContext.Provider>
  );
}

export default App;
