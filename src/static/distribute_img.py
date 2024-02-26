from PIL import Image
from os import listdir, rename, walk, path, popen, remove
import exifread
import rawpy
import imageio
from time import sleep


def look_for_raw(img, img_path="/mnt/c/Users/plser/Pictures/SonyA6400", dest="./img/gallery"):
    if path.exists(f"{dest}/{img.split("-")[0].split(".")[0]}.ARW"):
        return
    for current, _, files in walk(img_path):
        for file in files:
            if file.startswith(img.split("-")[0].split(".")[0]) and file.endswith(".ARW"):
                print(f"Found {file}")
                popen(f"cp {current}/{file} {dest}/{file}")
                return file

def distribute_img(path="./img/gallery"):
    images = []
    listdir_img = listdir(path)
    for img in listdir_img:
        if img.endswith(".jpg"):
            look_for_raw(img)
            with Image.open(f"{path}/{img}") as img:
                images.append(img)
    sleep(1)
    galleries_height = {
        "1": [],
        "2": [],
        "3": []
    }

    file_to_create = []
    for im in images:
        _, h = im.size
        min_height_gal = min(galleries_height, key=lambda x: sum(galleries_height[x]))
        galleries_height[min_height_gal].append(h)
        rename(im.filename, f"{path}/gallery{min_height_gal}/{im.filename.split('/')[-1]}")
        rename(f"{path}/{im.filename.split("/")[-1].split("-")[0].split(".")[0]}.ARW", f"{path}/gallery{min_height_gal}/{im.filename.split("/")[-1].split("-")[0].split(".")[0]}.ARW")
        file_to_create.append((f"{path}/gallery{min_height_gal}/{im.filename.split('/')[-1]}", f"{path}/gallery{min_height_gal}/{im.filename.split('/')[-1].split('-')[0].split('.')[0]}.ARW"))

    for file in file_to_create:
        create_md_file(file[0], file[1])

def revert(path="./img/gallery"):
    for i in range(1, 4):
        images = listdir(f"{path}/gallery{i}")
        for img in images:
            if not img.endswith("ARW.png"):
                rename(f"{path}/gallery{i}/{img}", f"{path}/{img}")

def create_md_file(edited, raw, dest="../gallery/photos"):
    with rawpy.imread(raw) as roaw:
        try:
            thumb = roaw.extract_thumb()
        except rawpy.LibRawNoThumbnailError:
            print('no thumbnail found')
        except rawpy.LibRawUnsupportedThumbnailError:
            print('unsupported thumbnail')
        else:
            if thumb.format == rawpy.ThumbFormat.JPEG:
                with open(f"{raw}.jpgaw", 'wb') as f:
                    f.write(thumb.data)
            elif thumb.format == rawpy.ThumbFormat.BITMAP:
                imageio.imsave(f"{raw}.tiff", thumb.data)

    with open(edited, "rb") as r:
        metadata = exifread.process_file(r)
        if int(str(metadata["Image ImageWidth"])) > int(str(metadata["Image ImageLength"])):
            orientation = "horizontal"
        else:
            orientation = "vertical"
        
        with Image.open(f"{raw}.jpgaw") as newimg:
            if orientation == "vertical":
                r_newimg = newimg.rotate(90, expand=True)
                r_newimg.save(f"{raw}.png")
            else:
                newimg.save(f"{raw}.png")
            remove(f"{raw}.jpgaw")
        
        location = determine_location(metadata["EXIF DateTimeOriginal"])
        with open(f"{dest}/{edited.split("/")[-1]}.md", "w") as md:
            md.write("---\n")
            md.write(f"title: {edited.split("/")[-1]}\n")
            md.write(f"location: {location}\n")
            md.write(f"layout: photo-{orientation}.njk\n")
            md.write(f"datetime_taken: \"{metadata["EXIF DateTimeOriginal"]}\"\n")
            md.write(f"camera: {metadata["Image Make"]} {metadata["Image Model"]}\n")
            md.write(f"lens: {metadata['EXIF LensModel']}\n")
            md.write(f"focal: {metadata["EXIF FocalLength"]}mm\n")
            md.write(f"aperture: {metadata['EXIF FNumber']}\n")
            md.write(f"shutter: {metadata['EXIF ExposureTime']}\n")
            md.write(f"iso: {metadata['EXIF ISOSpeedRatings']}\n")
            md.write(f"img_edited: {edited}\n")
            md.write(f"img_raw: {raw}.png\n")
            md.write("---\n")

def determine_location(datetime_taken):
    location_per_date = {
        "2024:02:03": "Lausanne, Switzerland",
        "2024:02:04": "Geneva, Switzerland",
        "2024:02:10": "Paris, France",
        "2024:02:11": "Paris, France",
        "2024:02:17": "Lausanne, Switzerland",
        "2024:02:24": "Lausanne, Switzerland",
        "2024:02:25": "Geneva, Switzerland"
    }
    return location_per_date[str(datetime_taken).split(" ")[0]]

def delete_md_files():
    pass


if __name__ == "__main__":
    if input("Do you want to distribute images? (y/n): ") == "y":
        distribute_img()
    else:
        revert()
        delete_md_files()