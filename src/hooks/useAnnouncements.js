import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient.js";

const fetchAnnouncements = async () => {
  const { data } = await apiClient.get("/announcements");
  return data?.data ?? [];
};

export const useAnnouncements = () =>
  useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    staleTime: 1000 * 60,
  });


