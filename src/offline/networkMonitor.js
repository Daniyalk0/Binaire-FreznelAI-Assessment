class NetworkMonitor {
  constructor() {
    this.online = navigator.onLine;
    this.listeners = new Set();

    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  handleOnline = () => {
    this.online = true;
    this.notify();
  };

  handleOffline = () => {
    this.online = false;
    this.notify();
  };

  subscribe(listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.online));
  }

  isOnline() {
    return this.online;
  }

  destroy() {
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
    this.listeners.clear();
  }
}

export default NetworkMonitor;