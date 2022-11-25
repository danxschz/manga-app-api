import { NextFunction, Request, Response } from 'express';
import db from 'src/config/database';


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
const query = `
  SELECT
    m.id,
    m.slug,
    m.title,
    m.img_normal,
    m.img_large,
    m.synopsis,
    m.background,
    m.chapters,
    m.volumes,
    s.name as status,
    m.published,
    r.name as rating,
    m.links_amazon,
    m.links_viz,
    m.links_cdjapan,
    m.links_mal,
    m.links_wikipedia
  FROM
    manga m
  INNER JOIN
    status s
  ON
    m.status_id = s.id
  LEFT JOIN
    ratings r
  ON 
    m.rating_id = r.id
  WHERE
    m.id = $1
`;

async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const manga: unknown = await db.any(query, [119021]);
    return res.send(manga);
  } 
  catch(e) {
    next(e);
  }
}


// **** Export default **** //

export default {
  paths,
  list,
  detail,
} as const;
