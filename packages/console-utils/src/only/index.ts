export const only = (nums: Array<number>): number => {
	return nums.reduce((pre, next) => pre ^ next, 0);
};
export default only;