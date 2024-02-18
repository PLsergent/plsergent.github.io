const fg = require("fast-glob");

module.exports = function (eleventyConfig) {
    // Pass-through files
    eleventyConfig.addPassthroughCopy({ 'src/static/img': '/static/img' })
    eleventyConfig.addPassthroughCopy({ 'src/static/css': '/static/css' })
    eleventyConfig.addPassthroughCopy({ 'src/static/fonts': '/static/fonts' })
    eleventyConfig.addPassthroughCopy({ 'src/static/js': '/static/js' })
    eleventyConfig.addPassthroughCopy({ 'src/static/scss': '/static/scss' })
    eleventyConfig.addPassthroughCopy({ 'src/static/files': '/static/files' })
    eleventyConfig.addPassthroughCopy({ 'src/_data/gallery': '/gallery/' })
    eleventyConfig.addPassthroughCopy({ 'src/ads.txt': '/ads.txt' })

    eleventyConfig.addFilter("gallery", function (dir="") {
        return fg.sync(dir);
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}