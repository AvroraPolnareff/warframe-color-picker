
/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  assetPrefix: process.env.ASSET_PREFIX ?? "",
  env: {
    ssrFontSize: 20,
    index: process.env.INDEX
  }
}
