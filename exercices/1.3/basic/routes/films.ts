import { Router } from "express";
import { Film } from "../types";

const films: Film[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    duration: 142,
    description: "Two imprisoned",
    imageUrl: "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/",
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
    description:
      "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    imageUrl: "https://www.imdb.com/title/tt0068646/mediaviewer/rm10105600/",
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    imageUrl: "https://www.imdb.com/title/tt0468569/mediaviewer/rm10105600/",
  },
];
const router = Router();

router.get("/", (req, res) => {
  if (!req.query["minimum-duration"]) {
    // Cannot call req.query.budget-max as "-" is an operator
    return res.json(films);
  }
  const minDuration = Number(req.query["minimum-duration"]);
  const filteredFilms = films.filter((film) => {
    return film.duration >= minDuration;
  });
  return res.json(filteredFilms);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if (!film) {
    return res.sendStatus(404);
  }
  return res.json(film);
});

router.post("/", (req, res) => {
  const { title, director, duration, description, imageUrl } = req.body;
  if (!title || !director || !duration || !description || !imageUrl) {
    return res.sendStatus(400);
  }

  const nextId =
    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    description,
    imageUrl,
  };

  films.push(newFilm);
  return res.json(newFilm);
});

export default router;
