import { useState } from 'react';

const useLoadingSpinner = () => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = (loadingStatus: boolean) => {
    setLoading(loadingStatus);
  };

  return { 
    loading, 
    toggleLoading 
    };
};

export default useLoadingSpinner;
