import Vue from "vue";

const pad = (length: number, n: number): string =>
  String(n).padStart(length, "0");

Vue.filter("formatDateTime", (date: Date): string => {
  const y = pad(4, date.getFullYear());
  const m = pad(2, date.getMonth());
  const d = pad(2, date.getDate());
  const h = pad(2, date.getHours());
  const mi = pad(2, date.getMinutes());
  const s = pad(2, date.getSeconds());
  return `${y}/${m}/${d} ${h}:${mi}:${s}`;
});
