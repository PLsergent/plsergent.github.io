const fg = require("fast-glob");
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function (eleventyConfig) {
    // Pass-through files
    eleventyConfig.addPassthroughCopy({ 'src/static/img': '/static/img' })
    eleventyConfig.addPassthroughCopy({ 'src/static/css': '/static/css' })
    eleventyConfig.addPassthroughCopy({ 'src/static/fonts': '/static/fonts' })
    eleventyConfig.addPassthroughCopy({ 'src/static/js': '/static/js' })
    eleventyConfig.addPassthroughCopy({ 'src/static/scss': '/static/scss' })
    eleventyConfig.addPassthroughCopy({ 'src/static/files': '/static/files' })
    eleventyConfig.addPassthroughCopy({ 'src/static/img/gallery': '/gallery/' })
    eleventyConfig.addPassthroughCopy({ 'src/ads.txt': '/ads.txt' })

    eleventyConfig.addFilter("gallery", function (dir="") {
        return fg.sync(dir);
    });
    eleventyConfig.addPlugin(lazyImagesPlugin, {
        transformImgPath: (imgPath) => imgPath.replace('/gallery/', 'src/static/img/gallery/')
    });
    eleventyConfig.addFilter("gallery_mobile", function (dir="") {
        var imagesArr = fg.sync(dir)
        var cols = [[], [], []]
        var lengths = [0, 0, 0]

        for (let i = 0; i < imagesArr.length; i++) {
            var img = String(imagesArr[i])
            galleryName = img.split("/")[4] // galleryX
            galleryNumber = parseInt(galleryName.split("gallery")[1], 10) - 1
            imgPath = img.replace(`src/static/img/gallery/gallery${galleryNumber+1}/`, '/gallery/photos/')
            cols[galleryNumber].push(img)
            lengths[galleryNumber] ++
        }

        maxLength = Math.max(...lengths)
        const isMaxNumber= (element) => element == maxLength;
        maxLengthIndex = lengths.findIndex(isMaxNumber)
 
        result = []
        for (let k = 0; k < cols[maxLengthIndex].length; k++) {
            result.push(cols[0][k], cols[1][k], cols[2][k])
        }
        return result
    });

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}