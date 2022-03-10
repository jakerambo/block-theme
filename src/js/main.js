const blockThemeJsImporter = () => {
	const imports = [
		{
			path: 'sticky-header',
			test: document.querySelector('.sticky-header'),
		},
	];

	imports.forEach(({ path, test }) => {
		if (test) {
			import(
				/* webpackChunkName: "[request]" */
				`./theme/${path}`
			);
		}
	});
};

blockThemeJsImporter();
