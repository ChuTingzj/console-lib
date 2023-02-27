import SparkMD5 from 'spark-md5';
const fileSlice = (file: File, interval: number) => {
	const chunks: Array<Blob> = [];
	for (let i = 0; i < file.size; i += interval) {
		chunks.push(file.slice(i, i + interval + 1));
	}
	return chunks;
};
const getFileHash = (chunks: Array<Blob>) => {
	return new Promise<string>((resolve) => {
		const spark = new SparkMD5();
		const read = (index: number) => {
			if (index >= chunks.length) {
				resolve(spark.end());
				return;
			}
			const chunk = chunks[index];
			const fileReader = new FileReader();
			fileReader.onload = (event) => {
				const bytes = event.target?.result as string;
				spark.append(bytes);
				read(index + 1);
			};
			fileReader.readAsArrayBuffer(chunk);
		};
	});
};
export {fileSlice, getFileHash};
