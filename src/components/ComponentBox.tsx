import React from 'react';
import { motion } from 'framer-motion';

interface ComponentBoxProps {
  title: string;
  organization: string;
  isSelected: boolean;
  borderColor: string;
}

export const ComponentBox: React.FC<ComponentBoxProps> = ({
  title,
  organization,
  isSelected,
  borderColor,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-navy-800 text-lg font-semibold">{title}</h3>
      <motion.div
        animate={{
          scale: isSelected ? 1.05 : 1,
          boxShadow: isSelected
            ? '0 0 0 3px rgba(59, 130, 246, 0.5)'
            : '0 0 0 1px rgba(0, 0, 0, 0.1)',
        }}
        className="relative"
      >
        <div
          className="text-gray-600 mb-2"
          style={{ color: borderColor }}
        >
          {organization}
        </div>
        <div
          className="w-[300px] h-[120px] rounded-lg border-2"
          style={{ borderColor }}
        />
      </motion.div>
    </div>
  );
};