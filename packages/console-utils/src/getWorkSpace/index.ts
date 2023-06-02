export const getWorkSpace = () => {
  const absoluteArr = process.cwd().split('\\');
  const firstNodeModulesIndex = absoluteArr.findIndex((item) => item === 'node_modules');
  if (firstNodeModulesIndex === -1) return process.cwd();
  return absoluteArr.slice(0, firstNodeModulesIndex).join('\\');
};
export default getWorkSpace;