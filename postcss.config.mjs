// import autoprefixer from "autoprefixer";
// import postcssMixins from "postcss-mixins";
// import postcssPresetEnv from "postcss-preset-env";
// import postcssNested from "postcss-nested";
// import styleLint from "stylelint";
// import postcssReporter from "postcss-reporter";
import cssnanoPlugin from 'cssnano'

export default {
  plugins: [
    // autoprefixer(),
    // postcssMixins(),
    // postcssPresetEnv(),
    // postcssNested(),
    // styleLint(),
    // postcssReporter(),
    cssnanoPlugin({ preset: "default" }),
  ],
};
