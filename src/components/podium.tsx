import { getPredictionsSortedByWinProb } from "../data/predictions";
import "./podium.css";

type PodiumSlot = {
  driver: string;
};

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

export default function Podium() {
  const topThree = getPredictionsSortedByWinProb().slice(0, 3);

  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  const renderDriver = (slot?: PodiumSlot) => (slot ? DRIVER_NAMES[slot.driver] || slot.driver : "-");
  const renderPosition = (slot: PodiumSlot | undefined, position: number) =>
    slot ? `${position}` : "-";

  return (
    <div className="podium">
      <div className="podium__position podium__position--second">
        <h2 className="podium_driver_name">{renderDriver(second)}</h2>
        <p className="podium_predicted">Predicted</p>
        <p className="podium_position">{renderPosition(second, 2)}</p>
      </div>
      <div className="podium__position podium__position--first">
        <h2 className="podium_driver_name">{renderDriver(first)}</h2>
        <p className="podium_predicted">Predicted</p>
        <p className="podium_position">{renderPosition(first, 1)}</p>
      </div>
      <div className="podium__position podium__position--third">
        <h2 className="podium_driver_name">{renderDriver(third)}</h2>
        <p className="podium_predicted">Predicted</p>
        <p className="podium_position">{renderPosition(third, 3)}</p>
      </div>
    </div>
  );
}
