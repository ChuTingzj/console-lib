export const microRun = (fn: () => void) => {
	if (typeof queueMicrotask !== 'undefined') {
		queueMicrotask(fn);
	} else if (typeof Promise !== 'undefined') {
		Promise.resolve().then(fn);
	} else if (typeof MutationObserver !== 'undefined') {
		const observer = new MutationObserver(fn);
		const textNode = document.createTextNode('0');
		observer.observe(textNode, {
			characterData: true,
		});
		textNode.data = '1';
	} else {
		setTimeout(fn);
	}
};
export default microRun;