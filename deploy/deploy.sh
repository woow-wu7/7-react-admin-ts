#! /bin/bash

rm -rf dist

git pull

cnpm install --registry=https://registry.npm.taobao.org

cnpm run build --registry=https://registry.npm.taobao.org

