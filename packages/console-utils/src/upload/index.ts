export const enum EUploadType {
	'FormData',
	'Base64',
	'Binary',
}
export const uploadByXhr = <T extends keyof typeof EUploadType>(
	onProgress: (percent: number) => void,
	onFinish: (data: any) => void
) => {
	const xhr = new XMLHttpRequest();
	return (dataType: T) => {
		switch (dataType) {
			case 'FormData':
				return (data: Record<any, File>, url: string) => {
					const form = new FormData();
					const key = Reflect.ownKeys(data).shift() as string;
					form.append(key, data[key]);
					xhr.onload = () => {
						const res = JSON.parse(xhr.responseText);
						onFinish(res);
					};
					xhr.upload.onprogress = (event) => {
						const percent = Math.floor((event.loaded / event.total) * 100);
						onProgress(percent);
					};
					xhr.open('POST', url);
					xhr.send(form);
					return () => {
						xhr.abort();
					};
				};
			case 'Base64':
				return (data: File, url: string) => {
					const reader = new FileReader();
					const ext = '.' + data.name.split('.').pop();
					reader.readAsDataURL(data);
					reader.onload = (event) => {
						const base64 = (event.target?.result as string).split(',').pop();
						xhr.setRequestHeader('content-type', 'application/json');
						xhr.onload = () => {
							const res = JSON.parse(xhr.responseText);
							onFinish(res);
						};
						xhr.upload.onprogress = (event) => {
							const percent = Math.floor((event.loaded / event.total) * 100);
							onProgress(percent);
						};
						xhr.open('POST', url);
						xhr.send(JSON.stringify({ext, base64}));
					};
					return () => {
						xhr.abort();
					};
				};
			case 'Binary':
				return (data: File, url: string) => {
					const ext = '.' + data.name.split('.').pop();
					xhr.setRequestHeader('content-type', 'application/octet-stream');
					xhr.setRequestHeader('x-ext', ext);
					xhr.onload = () => {
						const res = JSON.parse(xhr.responseText);
						onFinish(res);
					};
					xhr.upload.onprogress = (event) => {
						const percent = Math.floor((event.loaded / event.total) * 100);
						onProgress(percent);
					};
					xhr.open('POST', url);
					xhr.send(data);
					return () => {
						xhr.abort();
					};
				};
			default:
				console.warn('👿:数据类型不匹配!');
				break;
		}
	};
};
