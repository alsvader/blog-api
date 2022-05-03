module.exports = {
	apps: [
		{
			name: 'blog-api',
			script: './index.js',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
