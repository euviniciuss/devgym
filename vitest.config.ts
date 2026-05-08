import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
	test: {
		environment: 'node',
		dir: 'src',
		projects: [
			{
				extends: true,
				test: {
					name: 'unit',
					dir: 'src/use-cases',
				},
			},
			{
				extends: true,
				test: {
					name: 'e2e',
					dir: 'src/http/controllers',
					environment:
						'./prisma/vitest-environment-prisma/prisma-test-environment.ts',
				},
			},
		],
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
