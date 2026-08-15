const fs = require('fs')
const path = require('path')

const imagesDir = path.join(__dirname, 'public', 'imgs')
const outputFilePath = path.join(__dirname, 'src', 'assets', 'imageList.json')

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err)
    process.exit(1)
  }

  const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file))
  const imagePaths = imageFiles.map((file) => `/imgs/${file}`)

  fs.mkdir(path.dirname(outputFilePath), { recursive: true }, (mkdirErr) => {
    if (mkdirErr) {
      console.error('Error creating assets directory:', mkdirErr)
      process.exit(1)
    }

    fs.writeFile(outputFilePath, JSON.stringify(imagePaths, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing image list file:', writeErr)
        process.exit(1)
      }
      console.log('Image list generated successfully.')
    })
  })
})
