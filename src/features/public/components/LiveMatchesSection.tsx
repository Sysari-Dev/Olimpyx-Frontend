import MatchCard from "@molecules/MatchCard";
const PARTIDOS_MOCK = [
  { id: "1", event: "Intercodigos Ing Minas", sport: "Vóley Femenino", team1: "Sistemas", team2: "Derecho", score1: 2, score2: 1, currentPeriod: "Set 3" },
  { id: "2", event: "Intercodigos Administración", sport: "Futsal Varones", team1: "Minas", team2: "Contabilidad", score1: 4, score2: 2, currentPeriod: "2do Tiempo" },
  { id: "3", event: "Intercodigos Educación Inicial", sport: "Básquet", team1: "Administración", team2: "Turismo", score1: 56, score2: 54, currentPeriod: "4to Cuarto" },
  { id: "4", event: "Intercarreras UNAMBA", sport: "Vóley Femenino", team1: "Sistemas", team2: "Derecho", score1: 2, score2: 1, currentPeriod: "Set 3" },
  { id: "5", event: "Intercarreras UTEA", sport: "Futsal Varones", team1: "Ciencia Política", team2: "Educación Inicial", score1: 2, score2: 2, currentPeriod: "1er Tiempo" },
  { id: "6", event: "Intercarreras UNAJMA", sport: "Básquet", team1: "Ing Ambiental", team2: "Ing Sistemas", score1: 36, score2: 44, currentPeriod: "4to Cuarto" },
];
const LiveMatchesSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-dark tracking-tighter">
          Partidos <span className="text-accent">en Vivo</span>
        </h1>
        <p className="text-dark/50 mt-2 font-medium">
          Sigue los resultados de las olimpiadas institucionales en tiempo real.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARTIDOS_MOCK.map((partido) => (
          <MatchCard 
            key={partido.id}
            {...partido} 
          />
        ))}
      </div>
    </section>
  );
};
export default LiveMatchesSection;