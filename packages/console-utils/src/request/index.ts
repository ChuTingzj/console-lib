export const enum EAjaxType {
	'XHR',
	'Fetch',
}
export type TRequestOptions<T> = {
	url: string;
	method: string;
	data: T;
};
export const request = <T extends keyof typeof EAjaxType, Y>(
	type: T,
	options: TRequestOptions<Y>,
	onProgress?: (percent: number) => void
) => {
	const {url, method, data} = options;
	switch (type) {
		case 'XHR':
			return new Promise<string>((resolve) => {
				const XHR = new XMLHttpRequest();
				XHR.onprogress = (event) => {
					onProgress?.(Math.floor((event.loaded / event.total) * 100));
				};
				XHR.onreadystatechange = () => {
					if (XHR.readyState === XHR.DONE) {
						resolve(XHR.responseText);
					}
				};
				XHR.open(method, url);
				XHR.send(JSON.stringify(data));
			});
		case 'Fetch':
			return new Promise<string>(async (resolve) => {
				const res = await fetch(url, {
					method,
					body: JSON.stringify(data),
				});
				const total = +res.headers.get('content-length')!;
				const reader = res.body!.getReader();
				const decoder = new TextDecoder();
				let text = '';
				let loaded = 0;
				while (true) {
					const {done, value} = await reader.read();
					if (done) {
						break;
					}
					loaded += value.length;
					text += decoder.decode(value);
					onProgress?.(Math.floor((loaded / total) * 100));
				}
				resolve(text);
			});
	}
};
