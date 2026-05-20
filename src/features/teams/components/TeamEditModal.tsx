import { useState } from "react";
import BaseModal from "@atoms/BaseModal";
import { InputText } from "@atoms/InputText";
import { Shield } from "lucide-react";

interface TeamEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (updatedTeam: { name: string }) => void;
  team: { name: string } | null;
}

export const TeamEditModal = ({
  isOpen,
  onClose,
  onConfirm,
  team,
}: TeamEditModalProps) => {
  const [name, setName] = useState(team?.name || "");
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={() => onConfirm({ name })}
      title="Editar equipo"
      description="Modifica el nombre oficial del club para las competiciones."
      confirmText="Actualizar"
    >
      <InputText
        label="Nombre del equipo"
        icon={Shield}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej. Real Abancay"
      />
    </BaseModal>
  );
};
