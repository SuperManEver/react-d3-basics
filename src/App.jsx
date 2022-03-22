import "./App.css";

import LineChart from "./components/line-chart";
import BarChart from "./components/bar-chart";
import VolumeChart from "./components/volume-chart";

import css from "./styles.module.css";

function App() {
  return (
    <div className="App">
      <div className={css.root}>
        <VolumeChart />
      </div>
    </div>
  );
}

export default App;
