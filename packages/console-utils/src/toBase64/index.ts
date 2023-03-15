export const toBase64 = (file: File, callback: (result: string) => void) => {
	const fileReader = new FileReader();
	fileReader.onload = (event) => {
		const base64 = (event.target?.result as string).split(',')[1];
		callback(base64);
	};
	fileReader.readAsDataURL(file);
};
