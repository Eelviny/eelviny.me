for filename in *.jpg; do
  echo "$(md5sum $filename | cut -c1-6).avif"
  magick convert "$filename" -quality 80 -resize 1000x "$(md5sum $filename | cut -c1-6).avif"
done
