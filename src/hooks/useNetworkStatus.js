import { useEffect, useState } from "react";
import NetworkMonitor from "../offline/NetworkMonitor";

const networkMonitor = new NetworkMonitor();

function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(
    networkMonitor.isOnline(),
  );

  useEffect(() => {
    return networkMonitor.subscribe(setIsOnline);
  }, []);

  return isOnline;
}

export default useNetworkStatus;