import BaseModal from "@atoms/BaseModal";

interface TeamStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  team: { name: string; status: "ACTIVE" | "INACTIVE" } | null;
}

export const TeamStatusModal = ({ isOpen, onClose, onConfirm, team }: TeamStatusModalProps) => {
  if (!team) return null;

  const isActive = team.status === "ACTIVE";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      variant={isActive ? "danger" : "primary"}
      title={isActive ? "Desactivar equipo" : "Activar equipo"}
      description={`Esta acción ${isActive ? 'desactivará' : 'activará'} al equipo en todas las competiciones asociadas. No desactives un equipo que esté participando actualmente en un torneo activo.`}
      confirmText={isActive ? "Desactivar" : "Activar"}
    />
  );
};