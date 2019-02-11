const HtmlWebpackPlugin = require('html-webpack-plugin');
function ReplaceTextWebpackPlugin(replacedObj) {
  this.replaceState = replacedObj;
}
ReplaceTextWebpackPlugin.prototype.apply = function(compiler) {
  compiler.hooks.compilation.tap('ReplaceTextWebpackPlugin', compilation => {
    HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
      'ReplaceTextWebpackPlugin',
      (data, cb) => {
        data.html = data.html
          .replace(/\/marketbuzz\//gi, '/')
          .replace(/PageTitle/gi, this.replaceState.title);
        cb(null, data);
      }
    );
  });
};
module.exports = ReplaceTextWebpackPlugin;

//for three version
// function ReplaceMarketbuzzPlugin() {}
// ReplaceMarketbuzzPlugin.prototype.apply = function(compiler) {
//   compiler.hooks.compilation.tap('ReplaceMarketbuzzPlugin', compilation => {
//     compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
//       'ReplaceMarketbuzzPlugin',
//       (data, cb) => {
//         data.html = data.html.replace(/\/marketbuzz\//g, '/');
//         cb(null, data);
//       }
//     );
//   });
// };

// module.exports = ReplaceMarketbuzzPlugin;
