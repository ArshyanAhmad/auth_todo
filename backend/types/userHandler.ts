import { Request, Response, NextFunction } from "express";

export type RouteHandler<T = any> = (req: Request<T>, res: Response, next: NextFunction) => void | Promise<void>;
