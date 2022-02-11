export function storage(key: string, value?: any): any {
  if (value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  return JSON.parse(localStorage.getItem(key) || '[]');
}

export function clearStorage(key: string) {
  return localStorage.removeItem(key);
}