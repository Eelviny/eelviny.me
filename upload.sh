#! /bin/bash
JEKYLL_ENV=production jekyll build
aws s3 sync static/ s3://eelviny/ --delete --storage-class REDUCED_REDUNDANCY --cache-control max-age=86400
