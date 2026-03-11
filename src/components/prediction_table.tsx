import predictionsData from "../assets/predictions.json";
import "./prediction_table.css";

const DRIVER_NAMES: Record<string, string> = {
  ALB: "Alex Albon",
  ALO: "Fernando Alonso",
  ANT: "Kimi Antonelli",
  BEA: "Oliver Bearman",
  BOR: "Gabriel Bortoleto",
  BOT: "Valtteri Bottas",
  COL: "Franco Colapinto",
  GAS: "Pierre Gasly",
  HAD: "Isack Hadjar",
  HAM: "Lewis Hamilton",
  HUL: "Nico Hulkenberg",
  LAW: "Liam Lawson",
  LEC: "Charles Leclerc",
  LIN: "Arvid Lindblad",
  NOR: "Lando Norris",
  OCO: "Esteban Ocon",
  PER: "Sergio Perez",
  PIA: "Oscar Piastri",
  RUS: "George Russell",
  SAI: "Carlos Sainz",
  STR: "Lance Stroll",
  VER: "Max Verstappen",
};

const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

export default function PredictionTable() {
  const rows = [...predictionsData.predictions].sort(
    (a, b) => a.predicted_position - b.predicted_position,
  );

  if (rows.length === 0) {
    return <p>No prediction data available.</p>;
  }

  return (
    <section className="prediction-table">
      <h2 className="prediction-table__title">
        {predictionsData.event.year} {predictionsData.event.gp_name} Predictions
      </h2>
      <div className="prediction-table__scroll">
        <table className="prediction-table__grid">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Tag</th>
              <th>Qual Pos</th>
              <th>Win%</th>
              <th>Podium%</th>
              <th>Top10%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.predicted_position}>
                <td>{row.predicted_position}</td>
                <td className="prediction-table__driver">
                  {DRIVER_NAMES[row.driver] ?? row.driver}
                </td>
                <td className="prediction-table__tag">{row.driver}</td>
                <td>{Math.round(row.qual_position)}</td>
                <td className="prediction-table__num">
                  {formatPercent(row.winner_prob)}
                </td>
                <td className="prediction-table__num">
                  {formatPercent(row.podium_prob)}
                </td>
                <td className="prediction-table__num">
                  {formatPercent(row.top10_prob)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
