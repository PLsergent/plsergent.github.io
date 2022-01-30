module.exports = function (eleventyConfig) {
    // Pass-through files
    eleventyConfig.addPassthroughCopy({ 'src/static/img': '/static/img' })
    eleventyConfig.addPassthroughCopy({ 'src/static/css': '/static/css' })
    eleventyConfig.addPassthroughCopy({ 'src/static/fonts': '/static/fonts' })
    eleventyConfig.addPassthroughCopy({ 'src/static/js': '/static/js' })
    eleventyConfig.addPassthroughCopy({ 'src/static/scss': '/static/scss' })

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}