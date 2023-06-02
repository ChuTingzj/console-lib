export const equal = (arg1: any, arg2: any) => {
	if (typeof arg1 === 'object' && typeof arg2 === 'object') {
		const arg1Keys = Reflect.ownKeys(arg1);
		const arg2Keys = Reflect.ownKeys(arg2);
		if (arg1Keys.length === arg1Keys.length) {
			for (const key of arg1Keys) {
				if (!arg2Keys.includes(key)) {
					return false;
				} else {
					if (!equal(arg1[key], arg2[key])) {
						return false;
					}
				}
			}
		} else {
			return false;
		}
	} else {
		return arg1 === arg2;
	}
};
export default equal;