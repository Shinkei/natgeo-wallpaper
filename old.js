const fs = require('fs')
const path = require('path')
const os = require('os')
const request = require('request')
const wallpaper = require('wallpaper')
const cron = require('node-cron')

const imagePath = path.join(os.homedir(), '.natgeoImage.jpg')
const natgeoUrl = 'https://www.nationalgeographic.com/photography/photo-of-the-day/_jcr_content/.gallery.json'

const setNatgeoWallpaper = () => {
  request(natgeoUrl, function (error, res, body) {
    console.log('error:', error)
    console.log('statusCode:', res && res.statusCode)
    if (error) {
      console.log('error requesting natgeo site')
      return
    }
    const JBody = JSON.parse(body)

    const imageURL = JBody.items[0].sizes['2048']

    request.head(imageURL, (e, res, body) => {
      if (e) {
        console.log('error downloading the image')
        return
      }
      request(imageURL).pipe(fs.createWriteStream(imagePath)).on('close', () => {
        wallpaper.set(imagePath).then(() => console.log('wallpaper stablished'))
      })
    })
  })
}

// run cron 0 9 * * *
// cron.schedule('* * * * *', setNatgeoWallpaper)

setNatgeoWallpaper()