#! /bin/bash

rm -rf dist

git pull

cnpm install

cnpm run build

