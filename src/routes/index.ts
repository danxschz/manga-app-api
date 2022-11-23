import { Router } from 'express';

import manga from './manga';
import anime from './anime';


// **** Init **** //

const router = Router();


// **** Setup manga routes **** //

const mangaRouter = Router();

// Manga list
mangaRouter.get(manga.paths.list, manga.list);

// Manga detail
mangaRouter.get(manga.paths.detail, manga.detail);

// Add mangaRouter
router.use(manga.paths.basePath, mangaRouter);


// **** Setup anime routes **** //

const animeRouter = Router();

// Anime list
animeRouter.get(anime.paths.list, anime.list);

// Anime detail
animeRouter.get(anime.paths.detail, anime.detail);

// Add animeRouter
router.use(anime.paths.basePath, animeRouter);


// **** Export default **** //

export default router;
