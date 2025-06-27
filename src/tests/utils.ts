export default function normalize(str: string): string {
  return str
    .replace(/\r\n/g, '\n') // normaliza quebras de linha
    .replace(/\t/g, '  ')   // substitui tabs por espaços (ou remove se quiser)
    .trim();                // remove espaços no início/fim
}