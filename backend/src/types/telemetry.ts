export interface TelemetryData {
  // Mouse Behaviour
  mouseMoves: number;
  clicks: number;
  rageClicks: number;
  mouseSpeed: number;
  mouseX: number;
  mouseY: number;

  // Keyboard Behaviour
  keyPresses: number;
  backspaces: number;

  // Time Metrics
  idleTime: number;
  formDuration: number;

  // Form Behaviour
  averageFieldTime: number;
  fieldsCompleted: number;
}