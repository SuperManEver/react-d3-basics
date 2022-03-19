import "./App.css";

import Chart from "./chart";

import css from "./styles.module.css";

function App() {
  return (
    <div className="App">
      <div className={css.root}>
        <Chart />
      </div>
    </div>
  );
}

export default App;
