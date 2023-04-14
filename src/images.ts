import { Router, Request, Response } from 'express';
import { resize } from './resize';
import { isNil, isNumber } from 'lodash';
import path from 'path';
import fs from 'fs';
const imagesRouter: Router = Router();

imagesRouter.get('/images', async (req: Request, res: Response) => {
  const width: number = parseInt(req.query.width as string) || 0;
  const height: number = parseInt(req.query.height as string) || 0;
  const filename: string = req.query.filename as string;

  if (isNil(filename)) {
    res.status(400).send('Missing photo name');
    return;
  }

  const imageFolderPath: string = path.join(
    __dirname,
    '..',
    'images',
    'full',
    `${filename}.jpg`
  );

  if (!fs.existsSync(imageFolderPath)) {
    res.status(400).send('Requested image does not exist');
    return;
  }

  if (!isNumber(width)) {
    res.status(400).send('Wrong width value');
    return;
  }

  if (width <= 0) {
    res.status(400).send('Width must be greater than 0');
    return;
  }

  if (!isNumber(height)) {
    res.status(400).send('Wrong height value');
    return;
  }

  if (height <= 0) {
    res.status(400).send('height must be greater than 0');
    return;
  }

  try {
    const outputThumb = await resize(width, height, filename);
    res.sendFile(outputThumb);
  } catch (error) {
    res.status(404).send('Image not found');
  }
});

export default imagesRouter;
