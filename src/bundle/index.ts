import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

export const initializeEsBuild = async () => {
  await esbuild.initialize({
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.16.16/esbuild.wasm',
    worker: true
  });
}

export const bundle = async (rawCode: string): Promise<{ code: string, error: string  }> => {
  // const result = await esbuild.transform(input, {
  //   loader: 'jsx',
  //   target: 'es2015'
  // });

  try {
    const build = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment'
    });

    return {
      code: build.outputFiles[0].text,
      error: ''
    };

  } catch (e: any) {
    return {
      code: '',
      error: e.message
    };
  }
}


export default bundle;
