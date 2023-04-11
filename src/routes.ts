import {
  Router,
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import imagesRouter from "./images";

const router: Router = Router();

router.get("/", (req: Request, res: Response): void => {
  res.render("index");
});
// Images Router
router.use("/api", imagesRouter);
//404 Page not found
router.use((req: Request, res: Response): void =>
  res.status(404).render("404")
);
// 500 Server Errors Handlers
router.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) => {
    console.log(error);
    res.status(500).render("500");
  }
);

export default router;
