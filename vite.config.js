import { resolve } from 'path';
import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';

const globalSCSS = {
    variables: './src/scss/global/variables.scss',
    mixins: './src/scss/global/mixins.scss',
}

export default defineConfig({
    css: {
        postcss: {
            plugins: [
                postcssPresetEnv()
            ]
        },
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "${globalSCSS.variables}"; 
                    @import "${globalSCSS.mixins}";
                    `
            }
        }
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'vite-boilerplate',
            fileName: (format) => `vite-boilerplate.${format}.js`,
        }
    }
})