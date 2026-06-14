import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <div className="relative flex items-center shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-md border transition-colors select-none
          peer-focus-visible:ring-2 peer-focus-visible:ring-white/40
          ${checked 
            ? 'bg-white border-white' 
            : 'bg-transparent border-white/20'
          }
        `}
      >
        {checked && <Check size={14} strokeWidth={3} className="text-black" />}
      </div>
    </div>
  );
}
