from PIL import Image, ExifTags
from os import listdir, rename
from random import shuffle, randint


def distribute_img(path="./gallery"):
    images = []
    listdir_img = listdir(path)
    for img in listdir_img:
        if img.endswith(".jpg"):
            with Image.open(f"{path}/{img}") as img:
                images.append(img)

    galleries_height = {
        "1": [],
        "2": [],
        "3": []
    }

    for im in images:
        _, h = im.size
        min_height_gal = min(galleries_height, key=lambda x: sum(galleries_height[x]))
        galleries_height[min_height_gal].append(h)
        rename(im.filename, f"{path}/gallery{min_height_gal}/{im.filename.split('/')[-1]}")

def revert():
    for i in range(1, 4):
        images = listdir(f"./gallery/gallery{i}")
        for img in images:
            rename(f"./gallery/gallery{i}/{img}", f"./gallery/{img.split('$')[-1]}")

if __name__ == "__main__":
    if input("Do you want to distribute images? (y/n): ") == "y":
        distribute_img()
    else:
        revert()