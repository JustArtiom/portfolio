export function getAgeSince(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;

  return age;
}

export function yearsSince(birthDate: string) {
  const start = new Date(birthDate).getTime();
  const diff = Date.now() - start;
  return diff / (365.25 * 24 * 60 * 60 * 1000);
}
