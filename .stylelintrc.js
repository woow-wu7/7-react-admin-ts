module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-scss'],
  rules: {
      // // 不要使用已被 autoprefixer 支持的浏览器前缀
      // 'media-feature-name-no-vendor-prefix': true,
      // 'at-rule-no-vendor-prefix': true,
      // 'selector-no-vendor-prefix': true,
      // 'property-no-vendor-prefix': true,
      // 'value-no-vendor-prefix': true,
      indentation: [2, { baseIndentLevel: 1 }],
      'no-descending-specificity': null,
      'at-rule-no-unknown': null,
      'block-no-empty': null,
      'property-no-unknown': null,
  },
  ignoreFiles: ['node_modules/**', 'dist/**', 'src/assets/**', 'src/styles/**']
}