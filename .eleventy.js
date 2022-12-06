module.exports = function (eleventyConfig) {
    // Pass-through files
    eleventyConfig.addPassthroughCopy({ 'src/static/img': '/static/img' })
    eleventyConfig.addPassthroughCopy({ 'src/static/css': '/static/css' })
    eleventyConfig.addPassthroughCopy({ 'src/static/fonts': '/static/fonts' })
    eleventyConfig.addPassthroughCopy({ 'src/static/js': '/static/js' })
    eleventyConfig.addPassthroughCopy({ 'src/static/scss': '/static/scss' })
    eleventyConfig.addPassthroughCopy({ 'src/static/files': '/static/files' })
    eleventyConfig.addPassthroughCopy({ 'src/ads.txt': '/ads.txt' })

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}