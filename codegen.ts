import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	ignoreNoDocuments: true,
	schema: [
		{
			[`https://api-us-east-1-shared-usea1-02.hygraph.com/v2/${process.env.CMS_SPACE}/${process.env.CMS_ENV}`]:
				{
					headers: {
						Authorization: `Bearer ${process.env.CMS_PROD_TOKEN}`,
					},
				},
		},
	],
	documents: ['./src/graphql/{queries,fragments}/**/*.ts', '!node_modules'],
	hooks: {
		afterAllFileWrite: ['prettier --write'],
	},
	generates: {
		'./src/graphql/generated/cms.generated.ts': {
			config: {
				avoidOptionals: true,
			},
			plugins: [
				{
					add: {
						content: `/* eslint-disable */\n/* This file was automatically generated and should not be edited. */\n`,
					},
				},
				'typescript',
				'typescript-operations',
				'typescript-graphql-request',
			],
		},
		'./schema.generated.graphql': {
			plugins: ['schema-ast'],
		},
	},
};

export default config;
