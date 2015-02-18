#!/bin/bash
VERSION="v0.1"

rm *.zip; zip -r plan4_$VERSION.zip plan4_app manifest.json -x "*/\.DS_Store*"