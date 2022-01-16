const withTM = require('next-transpile-modules')(['@datorama/akita'])

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["eaterblobstorap01.blob.core.windows.net"]
    }
    // experimental: {
    //   concurrentFeatures: true,
    //   serverComponents: true,
    // }
}

module.exports = withTM(nextConfig)
