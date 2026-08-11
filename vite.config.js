import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function contactApiMiddleware() {
  return {
    name: 'contact-api-middleware',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        const sendJson = (status, payload) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(payload))
        }

        if (req.method !== 'POST') {
          res.setHeader('Allow', 'POST')
          sendJson(405, { message: 'Metode tidak diizinkan.' })
          return
        }

        try {
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const rawBody = Buffer.concat(chunks).toString('utf8')
          req.body = rawBody ? JSON.parse(rawBody) : {}
          res.status = (status) => ({ json: (payload) => sendJson(status, payload) })

          const { default: contactHandler } = await import('./api/contact.js')
          await contactHandler(req, res)
        } catch (error) {
          if (error instanceof SyntaxError) {
            sendJson(400, { message: 'Format data formulir tidak valid.' })
            return
          }
          next(error)
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [contactApiMiddleware(), react(), tailwindcss()],
  }
})
