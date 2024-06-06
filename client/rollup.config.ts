import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.tsx',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    typescript()
  ]
};
