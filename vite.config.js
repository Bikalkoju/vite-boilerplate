import { resolve } from 'path';
import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import VitePluginLibAssets from '@laynezh/vite-plugin-lib-assets';

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
            name: 'main',
            fileName: 'main',
            formats: ['es', 'umd']
        }
    },
    plugins: [
        VitePluginLibAssets({
            name: '[name].[ext]',
            outputPath: (url, resourcePath, resourceQuery) => {
                if (url.match(/\.(png|svg|jpg|jpeg|gif|webp)$/i)) return 'images';
                if (url.match(/\.(woff|woff2|eot|ttf|otf)$/i)) return 'fonts';
                if (url.match(/\.(mp4|webm|ogv)/i)) return 'videos';
                return 'assets';
            }
        })
    ]
})