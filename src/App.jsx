import "./App.css";

import LineChart from "./components/line-chart";
// import BarChart from "./components/bar-chart";
import VolumeChart from "./components/volume-chart";

/**
 * exercises
 */

import BarChart from "./exercises/bar-chart";

import css from "./styles.module.css";

function App() {
  return (
    <div className="App">
      <BarChart />
    </div>
  );
}

export default App;
