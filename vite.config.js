import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { readdirSync, existsSync } from 'fs'

function getBlogPosts() {
  const postsDir = resolve(__dirname, 'blog/posts')
  if (!existsSync(postsDir)) return {}
  const entries = {}
  for (const file of readdirSync(postsDir)) {
    if (file.endsWith('.html')) {
      const name = `blog/posts/${file.replace('.html', '')}`
      entries[name] = resolve(postsDir, file)
    }
  }
  return entries
}

// GitHub Pages base path — edit to match your repo name.
// User/org site (xxx.github.io) → '/'
// Project site (xxx.github.io/repo) → '/repo/'
const base = '/'

export default defineConfig({
  base,
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        ...getBlogPosts(),
      },
    },
  },
})
