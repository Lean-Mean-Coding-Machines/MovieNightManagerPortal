import { useState } from 'react';

export default function useLoadingSpinner() {
  const [loading, setLoading] = useState(false);

  const toggleLoading = (loadingStatus: boolean) => {
    setLoading(loadingStatus);
  };

  return {
    loading,
    toggleLoading,
  };
}
