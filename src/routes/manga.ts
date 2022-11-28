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
async function detail(req: Request, res: Response, next: NextFunction) {
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
      s.name AS status,
      m.published,
      (
        SELECT array_agg("name") AS demographics
        FROM manga_demographics md
        INNER JOIN demographics d
        ON md.demographic_id = d.id
        WHERE md.manga_id = m.id
      ) AS demographics,
      (
        SELECT array_agg("title")
        FROM manga_alt_titles
        WHERE manga_id = m.id
      ) AS alt_titles,
      r.name AS rating,
      m.links_amazon,
      m.links_viz,
      m.links_cdjapan,
      m.links_mal,
      m.links_wikipedia
    FROM manga m
    INNER JOIN status s
    ON m.status_id = s.id
    LEFT JOIN ratings r
    ON m.rating_id = r.id
    WHERE m.id = $1
  `;

  const a = `
    SELECT array_agg("name") AS demographics
    FROM manga_demographics md
    INNER JOIN demographics d
    ON md.demographic_id = d.id
    WHERE md.manga_id = $1
  `;

  try {
    const manga: any = await db.one(query, [119021]);
    
    const {
      img_normal, 
      img_large, 
      //alt_titles, 
      links_amazon, 
      links_viz, 
      links_cdjapan, 
      links_mal, 
      links_wikipedia, 
      ...result
    } = manga;

    const img = {
      normal: img_normal,
      large: img_large,
    };
    result.img = img;

    //    const titlesArray = alt_titles.split(', ');
    //   result.alt_titles = titlesArray;

    const links = {
      amazon: links_amazon,
      viz: links_viz,
      cdjapan: links_cdjapan,
      mal: links_mal,
      wikipedia: links_wikipedia,
    };
    result.links = links;
    
    return res.send(result);
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
