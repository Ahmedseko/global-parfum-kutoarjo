function toIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// "Today" from the server's local wall-clock date, not UTC — a sales day
// should roll over at local midnight, not at UTC midnight.
export function todayIso() {
  return toIso(new Date());
}

export function monthStartIso() {
  const now = new Date();
  return toIso(new Date(now.getFullYear(), now.getMonth(), 1));
}
