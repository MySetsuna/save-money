import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  // https://cn.vitejs.dev/config/#using-environment-variables-in-config
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.BASE_URL, 'env.BASE_URL');
  return {
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    plugins: [
      /*
      Uncomment the following line to enable solid-devtools.
      For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
      */
      devtools(),
      solidPlugin(),
    ],
    base: env.BASE_URL,
    server: {
      port: 3000,
    },
    build: {
      target: 'esnext',
    },
  };
});
