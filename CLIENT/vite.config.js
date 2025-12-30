import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isGithubPages = process.env.GITHUB_PAGES === "true";
const base = isGithubPages ? "/MARGAN_DAS/" : "/";
// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [tailwindcss(),react()],
})
