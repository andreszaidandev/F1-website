import "./App.css";
import PredictionTable from "./components/prediction_table";
import WinnerBackground from "./components/winner_background";

function App() {
  return (
    <div className="App">
      <WinnerBackground />
      <section className="predictions-section">
        <div className="predictions-section__content">
          <PredictionTable />
        </div>
      </section>
    </div>
  );
}

export default App;
