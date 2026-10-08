import useNetworkStatus from "../../hooks/useNetworkStatus";

function ConnectionStatus() {
  const isOnline = useNetworkStatus();

  return (
    <div
      className="fixed bottom-3 right-3 z-50 rounded-full bg-[#171d25]/95 px-3 py-1.5 text-xs text-white shadow-lg backdrop-blur-sm sm:bottom-4 sm:right-4"
      role="status"
      aria-live="polite"
    >
      {isOnline ? "● Online" : "● Offline"}
    </div>
  );
}

export default ConnectionStatus;