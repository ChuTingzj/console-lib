export const textToVoice = (text: string, options: Partial<SpeechSynthesisUtterance>) => {
	const utterance = new SpeechSynthesisUtterance(text);
	Object.assign(utterance, options);
	speechSynthesis.addEventListener('voiceschanged', function () {
		if (!Reflect.has(options, 'voice')) {
			const voices = speechSynthesis.getVoices();
			utterance.voice = voices[0];
		}
	});
	speechSynthesis.speak(utterance);
};
export default textToVoice;