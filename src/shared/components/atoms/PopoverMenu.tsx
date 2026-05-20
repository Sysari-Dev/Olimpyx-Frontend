import { useRef } from "react";

interface PopoverItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  description?: string;
}

interface PopoverMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRect: DOMRect | null;
  items: PopoverItem[];
  title?: string;
}

const PopoverMenu = ({ isOpen, onClose, anchorRect, items, title }: PopoverMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !anchorRect) return null;

  const menuWidth = 280;
  const menuHeight = items.length * 60 + (title ? 60 : 20);
  const { innerWidth, innerHeight } = window;

  let top = anchorRect.bottom + 10;
  let left = anchorRect.left;
  let originX = "left";
  let originY = "top";

  if (left + menuWidth > innerWidth) {
    left = anchorRect.right - menuWidth;
    originX = "right";
  }

  if (top + menuHeight > innerHeight) {
    top = anchorRect.top - menuHeight - 10;
    originY = "bottom";
  }

  const originClass = `origin-${originY}-${originX}`;

  return (
    <>
      <div className="fixed inset-0 z-100" onClick={onClose} />
      <div
        ref={menuRef}
        style={{ top, left }}
        className={`fixed z-101 w-70 bg-white rounded-lg border border-light shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200 ${originClass}`}
      >
        {title && (
          <div className="px-4 py-3 border-b border-light bg-light/20">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-dark/40">{title}</h3>
          </div>
        )}
        <div className="max-h-100 overflow-y-auto custom-scrollbar">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className="w-full flex items-start gap-3 px-4 py-3 hover:bg-light transition-colors text-left group"
            >
              <div className="p-2 rounded-lg bg-light text-dark/40 group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-dark leading-none mb-1 group-hover:text-accent transition-colors">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-[10px] text-dark/40 font-medium line-clamp-2 leading-tight">
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PopoverMenu;