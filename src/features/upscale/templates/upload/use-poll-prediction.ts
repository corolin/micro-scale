import useSWR from "swr";
import { Database } from "../../../../../types/supabase";
import { useUpscaleContext } from "../../context";

const fetcher = (url: string) =>
  fetch(url, { method: "POST" }).then((res) => res.json());

export default function usePollPrediction() {
  const { currentPredictionId } = useUpscaleContext();

  const shouldPoll = !!currentPredictionId;

  const query = useSWR(
    shouldPoll ? `/api/predictions?id=${currentPredictionId}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  return {
    ...query,
    prediction: query.data
      ?.prediction as Database["public"]["Tables"]["predictions"]["Row"],
  };
}
