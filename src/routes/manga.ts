import { Request, Response } from 'express';


// **** Variables **** //

// Paths
const paths = {
  basePath: '/manga',
  list: '/',
  detail: '/:id',
} as const;


// **** Functions **** //

// Manga list
function list(req: Request, res: Response) {
  return res.send('Manga List');
}

// Manga detail
function detail(req: Request, res: Response) {
  return res.send('Manga Detail');
}


// **** Export default **** //

export default {
  paths,
  list,
  detail,
} as const;
