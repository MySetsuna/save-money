class LocalStore {
  storeKey: string;
  userId: number;
  constructor(userId: number) {
    this.userId = userId;
    this.storeKey = import.meta.env.STORE_KEY ?? "" + "_" + userId;
  }

  get(key: string) {
    const str = localStorage.getItem(`${this.storeKey}_${key}`) ?? "";
    return JSON.parse(str);
  }

  set(key: string, value: any) {
    let jsonStr: string;
    try {
      jsonStr = JSON.stringify(value);
      localStorage.setItem(`${this.storeKey}_${key}`, jsonStr);
    } catch (err) {
      console.log(err, "该对象不支持存储");
    }
  }

  clear(key: string | undefined) {
    if (key) {
      localStorage.removeItem(key);
    } else {
      const keys = Object.keys(localStorage);
      for (const key of keys) {
        if (key.startsWith(this.storeKey)) {
          localStorage.removeItem(key);
        }
      }
    }
  }
}
export default LocalStore;
