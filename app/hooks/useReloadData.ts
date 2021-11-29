import { useCallback } from 'react';
import { useNavigate } from 'remix';

export function useReloadData() {
  let navigate = useNavigate();

  // return a function which will navigate to `.` (same URL) and replace it
  // This will rerun the loader
  return useCallback(
    function revalidate() {
      navigate('.', { replace: true });
    },
    [navigate]
  );
}
