interface TeamDisplayProps {
  name: string;
  score: number;
  reverse?: boolean;
}
export const TeamDisplay = ({ name, score, reverse }: TeamDisplayProps) => (
  <div className={`flex flex-col items-center ${reverse ? 'flex-col-reverse' : ''}`}>
    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl font-black mb-2 border border-white/5">
      {name[0]}
    </div>
    <p className="text-[10px] font-black uppercase tracking-tighter mb-1">{name}</p>
    <p className="text-5xl font-black text-accent italic">{score}</p>
  </div>
);