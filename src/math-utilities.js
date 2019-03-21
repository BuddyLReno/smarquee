export function calculateAnimationValues(
  totalWidth,
  velocity,
  separatorMargin = 0
) {
  const finalDistance = totalWidth / 2 + separatorMargin;
  const time = totalWidth / velocity;

  return {
    distance: totalWidth,
    animatedDistance: finalDistance,
    time: time
  };
}
