import { Router, Request, Response } from "express";
// import {
//   listImages,
//   getImagePath,
//   thumbnailExists
// } from '../../utilities/fsOperations';
// import { resizeImage } from '../../utilities/sharp';
// import { generateFileName, trimExtension } from '../../utilities/helpers';
import { resize } from "./resize";
const imagesRouter: Router = Router();

interface QueryObj {
  filename?: string;
  width?: number;
  height?: number;
}

imagesRouter.get("/images", async (req: Request, res: Response) => {
  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);
  const filename = req.query.filename as string | undefined;

  if (!filename) {
    res.status(400).send("you are missing the photo name");
    return;
  }

  if (!width || width === 0 || width < 0) {
    res.status(400).send("please type a valid width");
    return;
  }

  if (!height || height === 0 || height < 0) {
    res.status(400).send("please type a valid height");
    return;
  }

  try {
    const outputThumb = await resize(width, height, filename);
    res.sendFile(outputThumb);
  } catch (error) {
    res.status(404).send("required image not found");
  }
});

export default imagesRouter;
