export default async function shortLink (link: string) {
  return fetch('/api/hash/', { method: 'POST', body: link })
    .then((e) => e.json())
    .then((r) => r.result);
}
