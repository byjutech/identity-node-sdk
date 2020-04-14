module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: "entry",
        targets: {
          node: 'current',
        },
        corejs: 2
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from"
  ]
};
