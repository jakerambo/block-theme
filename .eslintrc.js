module.exports = {
  env: {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jquery": true,
    "node": true
  },
  parser: "@babel/eslint-parser",
  plugins: [
    '@babel',
  ],
  extends: "airbnb",
  globals: {
    "wp": false,
    "embark": false,
  },
  rules: {
    "indent": [2, "tab", {
      "SwitchCase": 1
    }],
    "no-tabs": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "func-names": 0,
    "no-plusplus": 0,
    "radix": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-console": 0,
    "no-shadow": 0,
    "max-len": 0,
    "prefer-destructuring": ["error", {
      "object": true,
      "array": false
    }],
    "prefer-rest-params": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-indent": [2, "tab"],
    "react/jsx-indent-props": [2, "tab"],
    "react/jsx-props-no-spreading": 0,
    "react/jsx-filename-extension": [1, {
      "extensions": [".js", ".jsx"]
    }],
    "jsx-a11y/media-has-caption": 0
  }
};
