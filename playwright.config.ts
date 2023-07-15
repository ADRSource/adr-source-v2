import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const PORT = process.env.PORT ?? 3000;

export default defineConfig({
	testDir: './tests/e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: Boolean(process.env.CI),
	/* Retry on CI only */
	retries: process.env.CI !== undefined ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI !== undefined ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: `http://localhost:${PORT}`,
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'pnpm run start',
		port: Number(PORT),
		url: 'http://127.0.0.1:3000',
		reuseExistingServer: !Boolean(process.env.CI),
		env: {
			PORT: String(PORT),
		},
	},
});
