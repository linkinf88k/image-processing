import { Router, Request, Response } from "express";
import { resize } from "./resize";
const _ = require("lodash");

const imagesRouter: Router = Router();

interface QueryObj {
  filename?: string;
  width?: number;
  height?: number;
}

imagesRouter.get("/images", async (req: Request, res: Response) => {
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);
  const filename: string = req.query.filename as string;

  if (_.isNil(filename)) {
    res.status(400).send("Missing photo name");
    return;
  }

  if (!_.isNumber(width)) {
    res.status(400).send("Wrong width value");
    return;
  }

  if (!_.isNumber(height)) {
    res.status(400).send("Wrong height value");
    return;
  }

  try {
    const outputThumb = await resize(width, height, filename);
    res.sendFile(outputThumb);
  } catch (error) {
    res.status(404).send("Image not found");
  }
});

export default imagesRouter;
