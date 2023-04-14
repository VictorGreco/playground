var Jimp = require("jimp");
const { createWorker } = require('tesseract.js');

(async () => {
    const originalImagePath = ''; // Add route of original image to detect
    const temporalImageBlackAndWhite = '.src/images/temp.png';
    Jimp.read(originalFile, (err, image) => {
        if (err) throw err;
        image.color([
            { apply: "lighten", params: [50] }
        ]).write(originalImagePath);
    });

    const worker = await createWorker();

  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789'
  });
  const { data: { text } } = await worker.recognize(temporalImageBlackAndWhite);
  console.log(text);
  await worker.terminate();
})();