import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;

  constructor(private _storage: Storage) {
    this.init();
  }

  async init() {
    if (!this.storage) {
      this.storage = await this._storage.create();
    }
  }

  private async ready() {
    if (!this.storage) {
      await this.init();
    }
  }

  public async setItem(key: string, value: any): Promise<any> {
    await this.ready();
    return this.storage ? this.storage.set(key, value) : null;
  }

  public async getItem(key: string): Promise<any> {
    await this.ready();
    return this.storage ? this.storage.get(key) : null;
  }

  public async removeItem(key: string): Promise<void> {
    await this.ready();
    if (this.storage) await this.storage.remove(key);
  }

  public async clearItems(): Promise<void> {
    await this.ready();
    if (this.storage) await this.storage.clear();
  }

  public async keysItems(): Promise<string[] | undefined> {
    await this.ready();
    return this.storage?.keys();
  }

  public async lengthItems(): Promise<number | undefined> {
    await this.ready();
    return this.storage?.length();
  }
}
