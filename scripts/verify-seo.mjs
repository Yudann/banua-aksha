import { readFileSync } from 'node:fs'

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  .map((match) => JSON.parse(match[1]))

const readTag = (expression) => html.match(expression)?.[1] ?? null

console.log(JSON.stringify({
  title: readTag(/<title>(.*?)<\/title>/),
  canonical: readTag(/<link rel="canonical" href="([^"]+)/),
  description: readTag(/<meta\s+name="description"\s+content="([^"]+)/),
  ogSiteName: readTag(/<meta property="og:site_name" content="([^"]+)/),
  schemas: jsonLd.map((node) => ({
    type: node['@type'],
    name: node.name,
    alternateName: node.alternateName,
    url: node.url,
  })),
}, null, 2))
