import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  getItem(key: string): string {
    const value = localStorage.getItem(key);
    if (value === null) {
      throw new Error(`key ${key} not found in local storage`);
    }
    return value;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
