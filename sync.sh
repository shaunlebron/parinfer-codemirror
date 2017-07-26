#!/bin/sh

jsfile=parinfer-codemirror.js

##----------------------------------------------------------------------------
## Version sync
##----------------------------------------------------------------------------

# Get package.json version.
version=$(perl -n -e'/"version": "(.+)"/ && print "$1"' package.json)

# Sync version to code files.
sed -i.bak "s|^// Parinfer for CodeMirror.*|// Parinfer for CodeMirror $version|" $jsfile
sed -i.bak "s|^  version: .*|  version: \"$version\",|" $jsfile

rm ${jsfile}.bak

echo "Updated $jsfile with package.json version $version"
echo
