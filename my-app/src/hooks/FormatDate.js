export default function FormatDate(isostring) {
  const date = new Date(isostring);

  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(',', '')
}