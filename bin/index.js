#!/usr/bin/env node
const axios = require('axios')
const fs = require('fs')
const os = require('os')
const path = require('path')
const wallpaper = require('wallpaper')

const imagePath = path.join(os.homedir(), '.natgeoImage.jpg')
const natgeoUrl = 'https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.gallery.json'

const setWallpaper = async () => {
  try{
    const natgeoJson = await axios.get(natgeoUrl)
    const imageURL = natgeoJson.data.items[0].sizes['2048']
    // console.log(imageURL)
    const fileWriter = fs.createWriteStream(imagePath)

    const image = await axios({ url: imageURL, method: 'GET', responseType: 'stream' })
    image.data.pipe(fileWriter)

    await wallpaper.set(imagePath)
    console.log('enjoy your wallpaper')
  } catch(e){
    console.log(e)
  }
}

setWallpaper()