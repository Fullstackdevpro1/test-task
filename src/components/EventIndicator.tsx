import React from "react";
import { EventType } from "../types";

interface EventIndicatorProps {
  type: EventType;
  active: boolean;
}

const eventColors = {
  service_request: "#3B82F6",
  security: "#10B981",
  data_transmission: "#EF4444",
};

export const EventIndicator: React.FC<EventIndicatorProps> = ({
  type,
  active,
}) => {
  return (
    <div
      className={`px-4 py-2 rounded transition-all ${
        active ? "bg-opacity-100" : "bg-opacity-20"
      }`}
      style={{ backgroundColor: eventColors[type] }}
    >
      {type.replace("_", " ").toUpperCase()}
    </div>
  );
};
