/**
 * Calculate mouse speed between two points
 * @param previousX - Previous X coordinate
 * @param previousY - Previous Y coordinate  
 * @param currentX - Current X coordinate
 * @param currentY - Current Y coordinate
 * @param previousTime - Previous timestamp in ms
 * @param currentTime - Current timestamp in ms
 * @returns Speed in pixels per millisecond
 */
export function calculateMouseSpeed(
  previousX: number,
  previousY: number,
  currentX: number,
  currentY: number,
  previousTime: number,
  currentTime: number
): number {
  const distance = Math.sqrt(
    Math.pow(currentX - previousX, 2) +
    Math.pow(currentY - previousY, 2)
  );

  const time = currentTime - previousTime;

  if (time <= 0) return 0;

  return Number((distance / time).toFixed(2));
}

/**
 * Calculate idle time since last activity
 * @param lastActivityTime - Timestamp of last activity in ms
 * @returns Idle time in milliseconds
 */
export function calculateIdleTime(
  lastActivityTime: number
): number {
  return Date.now() - lastActivityTime;
}

/**
 * Detect if a click is a "rage click" (repeated clicks within 300ms)
 * @param previousClickTime - Timestamp of previous click in ms
 * @param currentClickTime - Timestamp of current click in ms
 * @returns True if it's a rage click
 */
export function isRageClick(
  previousClickTime: number,
  currentClickTime: number
): boolean {
  return currentClickTime - previousClickTime < 300;
}

/**
 * Calculate duration spent on a field
 * @param focusTime - Timestamp when field was focused in ms
 * @returns Duration in milliseconds
 */
export function calculateFieldDuration(
  focusTime: number
): number {
  return Date.now() - focusTime;
}

/**
 * Calculate average field time
 * @param totalTime - Total time spent on all fields in ms
 * @param completedFields - Number of completed fields
 * @returns Average time per field in ms
 */
export function calculateAverageFieldTime(
  totalTime: number,
  completedFields: number
): number {
  if (completedFields === 0) return 0;
  return Math.round(totalTime / completedFields);
}

/**
 * Format duration for display
 * @param ms - Duration in milliseconds
 * @returns Formatted string (e.g., "2.5s" or "1m 30s")
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) {
    return `${seconds}.${Math.floor((ms % 1000) / 100)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}