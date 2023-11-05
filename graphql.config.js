const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

module.exports = {
	projects: {
		app: {
			schema: ['./schema.generated.graphql'],
			documents: ['!node_modules', 'src/graphql/{queries,fragments}/**/*.ts'],
			extensions: {
				endpoints: {
					default: {
						url: `https://api-us-east-1-shared-usea1-02.hygraph.com/v2/${process.env.CMS_SPACE}/${process.env.CMS_ENV}`,
						headers: { Authorization: `Bearer ${process.env.CMS_PROD_TOKEN}` },
					},
				},
			},
		},
	},
};
