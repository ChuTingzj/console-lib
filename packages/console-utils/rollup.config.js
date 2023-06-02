import terser from '@rollup/plugin-terser';
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input:'index.ts',
  output:{
    dir:'dist'
  },
  plugins:[terser()]
};
export default config;