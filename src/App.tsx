import React from 'react';
import { Frame } from '@shopify/polaris';
import { Route, Routes } from 'react-router-dom';
import { SideBar } from './components/SiderBar';
import routeMap from './routers/route';
import { IRoute } from './utils/type';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement
);

function App() {
  return (
    <>
      <Frame navigation={<SideBar />}>
        <Routes>
          {routeMap?.map((route: IRoute, idx: number) => (
            <Route key={idx} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </Frame>
    </>
  );
}

export default App;
