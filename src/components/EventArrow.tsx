import React from "react";
import { motion } from "framer-motion";
import { EventType } from "../types";

interface EventArrowProps {
  type: EventType;
  direction: "up" | "down";
  visible: boolean;
}

const eventColors = {
  service_request: "#3B82F6", // blue
  security: "#10B981", // green
  data_transmission: "#EF4444", // red
};

export const EventArrow: React.FC<EventArrowProps> = ({
  type,
  direction,
  visible,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0,
      }}
      className="absolute left-1/2 transform -translate-x-1/2"
      style={{
        color: eventColors[type],
        [direction === "up" ? "bottom" : "top"]: "100%",
      }}
    >
      {direction === "up" ? "↑" : "↓"}
    </motion.div>
  );
};
