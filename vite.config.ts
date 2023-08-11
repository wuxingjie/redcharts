import { resolve } from 'path';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve('./src/index.ts'),
            name: 'redcharts',
            // the proper extensions will be added
            fileName: 'redcharts',
        },
    },
});
