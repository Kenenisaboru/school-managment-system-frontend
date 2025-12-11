import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/apiClient.js";

const fetchDashboard = async () => {
  const { data } = await apiClient.get("/dashboard/overview");
  return data?.data;
};

export const useDashboardOverview = () =>
  useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboard,
    staleTime: 1000 * 60,
  });


