import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useAxios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFiltersState] = useState({ opcode: "", flag: "" });

  const API_URL = "http://172.16.130.8:6060/collect/bundle/txn?size=100&page=0";

  const fetchData = useCallback(
    async (customOpcode = filters.opcode, customFlag = filters.flag) => {
      setLoading(true);
      setError(null);

      const requestBody = {
        bundleId: "",
        opcode: customOpcode,
        flag: customFlag || "",
      };

      try {
        const response = await axios.post(API_URL, requestBody, {
          headers: {
            Authorization: "1234rt",
            "Content-Type": "application/json",
          },
        });

        const content = response?.data?.BUNDLE?.content;
        setData(Array.isArray(content) ? content : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    },
    [filters]
  );

  // Auto-fetch on filters change
  useEffect(() => {
    fetchData(filters.opcode, filters.flag);
  }, [filters, fetchData]);

  // ✅ Allows both object and function form
  const setFilters = (updater) => {
    setFiltersState((prev) => {
      const updated = typeof updater === "function" ? updater(prev) : updater;
      return updated;
    });
  };

  return { data, loading, error, refetch: fetchData, setFilters };
};

export default useAxios;
