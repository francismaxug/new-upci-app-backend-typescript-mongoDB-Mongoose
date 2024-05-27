import { Request, Response, NextFunction } from 'express'
export function catchAsync(
  fn: (req: any, res: any, next: any) => Promise<any>
) {
  return (req:Request, res:Response, next:NextFunction) => {
    fn(req, res, next).catch(next)
  }
}
