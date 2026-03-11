import rawPredictions from "../assets/predictions_2026_gp.json";

export type PredictionRow = {
  predicted_position: number;
  driver: string;
  driver_number: string;
  driver_id: string | null;
  qual_position: number | null;
  winner_prob: number;
  podium_prob: number;
  top10_prob: number;
};

export type PredictionEvent = {
  year: number;
  gp_name: string;
  round: number;
  event_date: string;
};

export type PredictionsPayload = {
  generated_at_utc: string;
  event: PredictionEvent;
  predictions: PredictionRow[];
};

const predictionsData = rawPredictions as PredictionsPayload;

export const getPredictionsSortedByWinProb = (): PredictionRow[] =>
  [...predictionsData.predictions].sort((a, b) => {
    if (b.winner_prob !== a.winner_prob) {
      return b.winner_prob - a.winner_prob;
    }
    return a.predicted_position - b.predicted_position;
  });

export default predictionsData;
