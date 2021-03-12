require("dotenv").config();
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const withOptimizedImages = require("next-optimized-images");
const withFonts = require("next-fonts");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

const nextConfig = {
  //**  빌드 시 번들 사이즈 분석 플러그인**//
  distDir: ".next",
  analyzewServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../../bundles/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html",
    },
  },
  compress: true,
  // webpack setting
  webpack(config) {
    const prod = process.env.NODE_ENV === "production";
    config.plugins = config.plugins || [];
    if (prod) {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          staticFileGlobsIgnorePatterns: [/\.next\//],
          minify: true,
        })
      );
    }
    config.plugins.push(
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      })
    );
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    );
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|ico)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });
    config.resolve.modules.push(__dirname);
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
    };
  },
};
module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
        },
      },
    ],
    [
      withOptimizedImages,
      {
        mozjpeg: {
          quality: 90,
        },
        webp: {
          preset: "default",
          quality: 90,
        },
      },
    ],
    withFonts,
    withBundleAnalyzer,
  ],
  nextConfig
);
