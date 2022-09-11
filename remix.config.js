/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  serverBuildDirectory: 'server/build',
  appDirectory: 'app',
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverDependenciesToBundle: [
    'dnd-core',
    'react-dnd',
    'react-dnd-html5-backend',
    'react-dnd-touch-backend',
    '@react-dnd/invariant',
    '@react-dnd/shallowequal',
    '@react-dnd/asap',
    'lowdb',
    'nanoid',
    'steno',
  ],
};
