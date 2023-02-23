export class Storage {
	static storage: globalThis.Storage;
	static getInstance<T extends globalThis.Storage>(storage: T) {
		if (Storage.storage) return;
		return (Storage.storage = storage);
	}
	static lens = Storage.storage.length;
	static key(index: number) {
		if (!Storage.storage) return;
		return Storage.storage.key(index);
	}
	static setItem(key: string, value: any, callback: (...args: any[]) => void, ...args: any[]) {
		if (!Storage.storage) return;
		callback.apply(this, args);
		try {
			Storage.storage.setItem(key, JSON.stringify(value));
		} catch (error) {
			console.log('👿:', error);
		}
	}
	static getItem(key: string, callback: (...args: any[]) => void, ...args: any[]) {
		if (!Storage.storage) return;
		callback.apply(this, args);
		return JSON.parse(Storage.storage.getItem(key) ?? '');
	}
	static removeItem(key: string, callback: (...args: any[]) => void, ...args: any[]) {
		if (!Storage.storage) return;
		callback.apply(this, args);
		Storage.storage.removeItem(key);
	}
	static clear(callback: (...args: any[]) => void, ...args: any[]) {
		if (!Storage.storage) return;
		callback.apply(this, args);
		Storage.storage.clear();
	}
}
