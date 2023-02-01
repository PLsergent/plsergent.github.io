module.exports = function (eleventyConfig) {
    // Pass-through files
    eleventyConfig.addPassthroughCopy({ 'src/static/img': '/static/img' })
    eleventyConfig.addPassthroughCopy({ 'src/static/css': '/static/css' })
    eleventyConfig.addPassthroughCopy({ 'src/static/fonts': '/static/fonts' })
    eleventyConfig.addPassthroughCopy({ 'src/static/js': '/static/js' })
    eleventyConfig.addPassthroughCopy({ 'src/static/scss': '/static/scss' })
    eleventyConfig.addPassthroughCopy({ 'src/static/files': '/static/files' })
    eleventyConfig.addPassthroughCopy({ 'src/ads.txt': '/ads.txt' })
    
    const markdownItAnchor = require('markdown-it-anchor');
    const markdownItToc = require('markdown-it-table-of-contents');
    const markdownItInclude = require('markdown-it-include');
    const markdownIt = require("markdown-it");

    let options = {
      html: true
    };

    // use markdown-it plugins
    let libmarkdownIt = markdownIt(options)
      .use(markdownItAnchor, {
        permalink: true,
        permalinkClass: "direct-link",
        permalinkSymbol: "🔗"
      })
      .use(markdownItToc, {
        includeLevel: [2, 3]
      })
      .use(markdownItInclude);
  
    eleventyConfig.setLibrary("md", libmarkdownIt);

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}