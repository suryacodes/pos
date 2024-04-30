interface LocalStorageUtil {
  save: (key: string, value: any) => void;
  load: (key: string) => any | null;
  remove: (key: string) => void;
  clearAll: () => void;
}

const localStorageUtil: LocalStorageUtil = {
  save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  load(key: string): any | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clearAll() {
    localStorage.clear();
  },
};

export default localStorageUtil;
