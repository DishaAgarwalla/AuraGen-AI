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

  return distance / time;
}

export function calculateIdleTime(
  lastActivityTime: number
): number {
  return Date.now() - lastActivityTime;
}

export function isRageClick(
  previousClickTime: number,
  currentClickTime: number
): boolean {
  return currentClickTime - previousClickTime < 300;
}

export function calculateFieldDuration(
  focusTime: number
): number {
  return Date.now() - focusTime;
}