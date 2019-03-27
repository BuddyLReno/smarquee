export function calculateAnimationValues(
  totalWidth,
  velocity,
  separatorMargin = 0
) {
  const finalDistance = totalWidth / 2 + separatorMargin / 2;
  const time = totalWidth / velocity;

  return {
    distance: totalWidth,
    animatedDistance: finalDistance,
    time
  };
}

export function generateHash() {
  let randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return (
    randomLetter +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}
