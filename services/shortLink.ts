export default async function shortLink(link: string) {
 return fetch('/api/hash/' + link, { method: 'POST' })
  .then((e) => e.json())
  .then((r) => r.result);
}
