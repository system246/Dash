// src/hooks/useBundleStats.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useBundleStats = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://172.16.130.8:6060/collect/bundle/stats');
        setStats(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching bundle stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export default useBundleStats;
