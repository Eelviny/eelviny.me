for filename in *.jpg; do
  echo "$(md5sum "$filename" | cut -c1-6).avif"
  magick convert "$filename" -quality 80 -resize 1000x -auto-orient -strip "$(md5sum "$filename" | cut -c1-6).avif"
done
magick convert something -quality 90 -resize 1200x630 -auto-orient -strip  feature.jpg
