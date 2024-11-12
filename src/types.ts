export type EventType = "service_request" | "security" | "data_transmission";

export interface Event {
  source: string;
  destination: string;
  type: EventType;
}

export interface ComponentPosition {
  x: number;
  y: number;
  scale: number;
}
