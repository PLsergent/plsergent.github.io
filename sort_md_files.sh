#!/bin/bash

walk_dir () {
    shopt -s nullglob dotglob

    for pathname in "$1"/*; do
        if [ -d "$pathname" ]; then
            walk_dir "$pathname"
        else
            case "$pathname" in
                *tosort*.md)
                    slmd "$pathname" -o
            esac
        fi
    done
}

DIR=./src/blog/

walk_dir "$DIR"