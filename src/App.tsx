import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComponentBox } from "./components/ComponentBox";
import { EventArrow } from "./components/EventArrow";
import { EventIndicator } from "./components/EventIndicator";
import { Event, EventType } from "./types";

const componentColors = {
  component_1: "#1E40AF",
  component_2: "#7C3AED",
  component_3: "#1E3A8A",
};

function App() {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  // const [ws, setWs] = useState<WebSocket | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    const websocket = new WebSocket("ws://127.0.0.1:8080/events");

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCurrentEvent(data);

      const isPassThrough =
        Math.abs(
          parseInt(data.source.split("_")[1]) -
            parseInt(data.destination.split("_")[1])
        ) > 1;

      if (isPassThrough) {
        setZoom(0.7);
      } else {
        setZoom(1);
      }
    };

    // setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const isComponentActive = (component: string) => {
    return (
      currentEvent?.source === component ||
      currentEvent?.destination === component
    );
  };

  const getEventDirection = (component: string) => {
    if (!currentEvent) return null;
    if (currentEvent.source === component) return "down";
    if (currentEvent.destination === component) return "up";
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        className="max-w-4xl mx-auto space-y-16"
        animate={{ scale: zoom }}
        transition={{ duration: 0.5 }}
      >
        {["component_1", "component_2", "component_3"].map(
          (component, index) => (
            <div key={component} className="relative">
              <ComponentBox
                title={`Component ${index + 1}`}
                organization={`Organization ${index + 1}`}
                isSelected={isComponentActive(component)}
                borderColor={
                  componentColors[component as keyof typeof componentColors]
                }
              />

              <div className="absolute left-full ml-8 top-1/2 -translate-y-1/2 flex gap-4">
                {(
                  [
                    "service_request",
                    "security",
                    "data_transmission",
                  ] as EventType[]
                ).map((type) => (
                  <EventIndicator
                    key={type}
                    type={type}
                    active={
                      currentEvent?.type === type &&
                      isComponentActive(component)
                    }
                  />
                ))}
              </div>

              <AnimatePresence>
                {getEventDirection(component) && (
                  <EventArrow
                    type={currentEvent!.type}
                    direction={getEventDirection(component)!}
                    visible={true}
                  />
                )}
              </AnimatePresence>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
}

export default App;
