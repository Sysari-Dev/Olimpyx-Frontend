interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}
export const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex gap-3">
    <div className="text-accent">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-dark/30 uppercase">{label}</p>
      <p className="text-xs font-bold text-dark leading-none">{value}</p>
    </div>
  </div>
);