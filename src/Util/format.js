export function getYearFromReleaseDate(releaseDate) {
  if (!releaseDate) return null;

  const date = new Date(releaseDate);
  if (isNaN(date)) return null;

  return date.getFullYear();
}
