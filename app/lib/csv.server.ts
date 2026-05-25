function escapeCsvValue(value: string) {
  const escapedFormula = /^[=+\-@]/.test(value) ? `'${value}` : value;
  const escapedQuotes = escapedFormula.replace(/"/g, "\"\"");

  return `"${escapedQuotes}"`;
}

export function toCsvRow(values: Array<string | null | undefined>) {
  return values.map((value) => escapeCsvValue(value ?? "")).join(",");
}
