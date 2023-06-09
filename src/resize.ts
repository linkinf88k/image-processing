import path from 'path';
import { promises as fsPromise } from 'fs';
import fs from 'fs';
import sharp from 'sharp';

export const resize = async (
  width: number,
  height: number,
  imgName: string
): Promise<string> => {
  const outputFolderPath: string = path.join(
    __dirname,
    '..',
    'images',
    'thumb',
    `${imgName}${width}x${height}.jpg`
  );

  const imageFolderPath: string = path.join(
    __dirname,
    '..',
    'images',
    'full',
    `${imgName}.jpg`
  );

  try {
    const outPutPath = path.join(__dirname, '..', 'images', 'thumb');

    if (!fs.existsSync(outPutPath)) {
      fs.mkdirSync(path.join(__dirname, '..', 'images', 'thumb'));
    }
    await fsPromise.access(outputFolderPath);
  } catch (error) {
    await sharp(imageFolderPath).resize(width, height).toFile(outputFolderPath);
  }
  return outputFolderPath;
};
