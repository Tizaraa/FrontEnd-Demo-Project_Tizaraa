import React from "react";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={`bg-gray-200 rounded-full ${className}`}>
      <div
        style={{ width: `${value}%` }}
        className="bg-blue-500 h-full rounded-full"
      />
    </div>
  );
}
