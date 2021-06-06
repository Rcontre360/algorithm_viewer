export const recursiveClear = (object: {
	[x: string]: jest.Mock < any,
	any >
}) => {
	Object.values(object).forEach(fn => {
		try {
			fn.mockClear();
		} catch (err) {
			if (typeof fn === 'object')
				recursiveClear(fn)
		}
	})
}