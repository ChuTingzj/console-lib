import {microRun} from '@/microRun';
export const forDom = (
	selector: keyof HTMLElementTagNameMap,
	whatToShow: number,
	filter: NodeFilter
) => {
	let node: Node;
	const nodeArr: Array<Node> = [];

	microRun(() => {
		const res = document.querySelector(selector);
		if (!res) {
			return;
		}
		node = res;
		const treeWalker = document.createTreeWalker(node, whatToShow, filter);
		let current: Node | null = treeWalker.currentNode;
		while (current) {
			nodeArr.push(current);
			current = treeWalker.nextNode();
		}
	});
	return nodeArr;
};
