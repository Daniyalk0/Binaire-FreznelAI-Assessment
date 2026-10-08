class CacheManager {
  constructor(prefix = "freznel-cache") {
    this.prefix = prefix;
  }

  getKey(key) {
    return `${this.prefix}:${key}`;
  }

  save(key, data) {
    try {
      const cache = {
        data,
        savedAt: Date.now(),
      };

      localStorage.setItem(
        this.getKey(key),
        JSON.stringify(cache),
      );

      return true;
    } catch (error) {
      console.error("Cache save failed:", error);
      return false;
    }
  }

  get(key) {
    try {
      const cached = localStorage.getItem(this.getKey(key));

      if (!cached) {
        return null;
      }

      return JSON.parse(cached).data;
    } catch (error) {
      console.error("Cache read failed:", error);
      return null;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error("Cache remove failed:", error);
    }
  }

  clear() {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(`${this.prefix}:`))
        .forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error("Cache clear failed:", error);
    }
  }
}

export default CacheManager;