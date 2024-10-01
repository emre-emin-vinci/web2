import { Router } from "express";
import { Film } from "../types";
import { NewFilm } from "../types";

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
  const body: unknown = req.body;  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0
) {
    return res.sendStatus(400);
}

  const { title, director, duration, description, imageUrl } = body as NewFilm;
  if (films.some((film) => film.title === title && film.director === director)) { 
    return res.sendStatus(409);
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
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = films.findIndex((films) => films.id === id );
  if (index === -1){
    return res.sendStatus(404);
  }
  const deletedElements = films.splice(index, 1); // splice() returns an array of the deleted elements
  return res.json(deletedElements[0]);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((films) => films.id === id);
  if (!film) {
    return res.sendStatus(404);
  }
  const body: unknown = req.body;
  if (!body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body && (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body && (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("description" in body && (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) ||
    ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0))
    ){
      return res.sendStatus(400);}
  const {title, director, duration, description, imageUrl, budget} = body as NewFilm;
  if  (title)
    film.title = title;
  if (director)
    film.director = director;
  if (duration)
    film.duration = duration;
  if (budget)
    film.budget = budget;
  if (description)
    film.description = description;
  if (imageUrl)
    film.imageUrl = imageUrl;
  return res.json(films);
} )

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((films) => films.id === id);
  const body: unknown = req.body;
  if (!body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body && (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body && (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("description" in body && (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) ||
    ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0))
    ){
      return res.sendStatus(400);
    }
  const {title, director, duration, description, imageUrl, budget} = body as NewFilm;
  if (!film){
    const nextId =
            films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) +
            1;
        const newFilm: Film = {
            id: nextId,
            title,
            director,
            duration,
            budget,
            description,
            imageUrl,
        };
        films.push(newFilm);
        return res.json(newFilm);
  }
    film.title = title;
    film.director = director;
    film.duration = duration;
    film.budget = budget;
    film.description = description;
    film.imageUrl = imageUrl;
    return res.json(film);
});
export default router;
