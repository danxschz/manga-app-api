import { Request, Response } from 'express';


// **** Variables **** //

// Paths
const paths = {
  basePath: '/anime',
  list: '/',
  detail: '/:id',
} as const;


// **** Functions **** //

// Anime list
function list(req: Request, res: Response) {
  return res.send('Anime List');
}

// Anime detail
function detail(req: Request, res: Response) {
  return res.send('Anime Detail');
}


// **** Export default **** //

export default {
  paths,
  list,
  detail,
} as const;
