interface PageTitleProps{
  title: string;
}
const PageTitle = ({title}: PageTitleProps) => <h1>{title}</h1>;

interface MovieProps{
  title: string;
  director: string;
}
const Movie = ({title, director}: MovieProps) => <li><strong>{title}</strong> - Réalisateur : {director}</li>;
interface CinemaProps{
  name: string;
  movies : MovieProps[];
}
const Cinema = ({name, movies} : CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {movies.map((movie, index) => (
          <Movie key={index} title={movie.title} director={movie.director} />
        ))}
      </ul>
    </div>
  );
};
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";

  const cinema1Name = "UGC DeBrouckère";

  const moviesCinema1 = [{
    title: "HAIKYU-THE DUMPSTER BATTLE",
    director: "Susumu Mitsunaka",
  },
  
    {title: "GOODBYE JULIA ",
    director: "Mohamed Kordofani",
    },];

  const cinema2Name = "UGC Toison d'Or";
  const moviesCinema2 = [{
    title: "THE WATCHERS",
    director: "Ishana Night Shyamalan",
  },
  {
    title: "BAD BOYS: RIDE OR DIE",
    director: "Adil El Arbi, Bilall Fallah",
  },];


  return (
    <div>
      <PageTitle title={pageTitle} />

      <Cinema name={cinema1Name} movies={moviesCinema1} />

      <Cinema name={cinema2Name} movies={moviesCinema2} />
    </div>
  );
};


export default App;
