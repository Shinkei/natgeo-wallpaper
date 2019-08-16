#!/bin/sh
NATGEO_URL="https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.gallery.json"
NATGEO_JSON=$(curl -s $NATGEO_URL)
echo $NATGEO_JSON