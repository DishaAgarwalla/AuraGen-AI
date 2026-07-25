/**
 * Calculate mouse speed between two points
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
 */
export function calculateIdleTime(
  lastActivityTime: number
): number {
  return Date.now() - lastActivityTime;
}

/**
 * Detect if a click is a "rage click" (repeated clicks within 300ms)
 */
export function isRageClick(
  previousClickTime: number,
  currentClickTime: number
): boolean {
  return currentClickTime - previousClickTime < 300;
}

/**
 * Calculate duration spent on a field
 */
export function calculateFieldDuration(
  focusTime: number
): number {
  return Date.now() - focusTime;
}

/**
 * Calculate average field time
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