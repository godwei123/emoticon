import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
    build: {
        lib: {
        entry: 'src/index.ts',
        name: 'EmoticonVue',
        },
        rollupOptions: {
        external: ['vue'],
        output: {
            globals: {
            vue: 'Vue',
            },
        },
        },
    },
})
