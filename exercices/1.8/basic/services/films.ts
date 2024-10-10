import { Film } from "../types";
import { NewFilm } from "../types";
import path from "node:path";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");


const defaultFilms: Film[] = [
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

function readAllFilms(order : string | undefined) {
    const orderByTitle = order && order.includes("title") ? order : undefined;
    let orderedFilms: Film[] = [];
    const films = parse(jsonDbPath, defaultFilms);
    if (orderByTitle)
        orderedFilms = [...films].sort((a, b) => a.title.localeCompare(b.title));
    if (orderByTitle === "-title")
        orderedFilms = orderedFilms.reverse();
  return orderedFilms.length === 0 ? films : orderedFilms;;
}
function readFilmsById(id: number) : Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  return films.find((film) => film.id === id);
}

function createFilm (newFilm: NewFilm) : Film {
  const films = parse(jsonDbPath, defaultFilms);
  const lastId = films[films.length - 1].id;
  const film: Film = { id: lastId + 1, ...newFilm };
  const updatedFilms = [...films, film];
  serialize(jsonDbPath, updatedFilms);
  return film;  
}

function deleteFilm(id: number) : Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);
  if (index === -1) return undefined;
  const deletedElements = films.splice(index, 1);
}