class LocalStorage {
  setItem(key: string, value: any) {
    if (this.getItem(key)) {
      this.removeItem(key);
    }
    const string = JSON.stringify(value);
    localStorage.setItem(key, string);
    return;
  }

  getItem(key: string) {
    let value = localStorage.getItem(key);
    try {
      const parsed = JSON.parse(value || "");
      return parsed;
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clearItems() {
    localStorage.clear();
  }
}

const storage = new LocalStorage();

export default storage;
