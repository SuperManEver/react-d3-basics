import "./App.css";

import LineChart from "./components/line-chart";

import css from "./styles.module.css";

function App() {
  return (
    <div className="App">
      <div className={css.root}>
        <LineChart />
      </div>
    </div>
  );
}

export default App;
