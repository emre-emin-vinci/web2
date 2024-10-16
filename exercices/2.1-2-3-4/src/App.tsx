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
  movie1Title: string;
  movie1Director: string;
  movie2Title: string;
  movie2Director: string;
}
const Cinema = (props : CinemaProps) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <ul>
        <Movie title={props.movie1Title} director={props.movie1Director} />
        {props.movie2Title && <Movie title={props.movie2Title} director={props.movie2Director} />}
      </ul>
    </div>
  );
};
const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";
  const cinema1Name = "UGC DeBrouckère";
  const cinema1Movie1Title = "Film 1 - DeBrouckère";
  const cinema1Movie1Director = "Director A";
  const cinema1Movie2Title = "Film 2 - DeBrouckère";
  const cinema1Movie2Director = "Director B";
  const cinema2Name = "UGC Toison d'Or";
  const cinema2Movie1Title = "Film 1 - Toison d'Or";
  const cinema2Movie1Director = "Director C";
  const cinema2Movie2Title = "Film 2 - Toison d'Or";
  const cinema2Movie2Director = "Director D";

  return (
    <div>
    <PageTitle title={pageTitle} />

    <Cinema
      name={cinema1Name}
      movie1Title={cinema1Movie1Title}
      movie1Director={cinema1Movie1Director}
      movie2Title={cinema1Movie2Title}
      movie2Director={cinema1Movie2Director}
    />
    <Cinema
      name={cinema2Name}
      movie1Title={cinema2Movie1Title}
      movie1Director={cinema2Movie1Director}
      movie2Title={cinema2Movie2Title}
      movie2Director={cinema2Movie2Director}
    />
    </div>
  );
};

export default App;
