import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
// import fs from "fs"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // https: {
    //   key: fs.readFileSync("../private.pem"),
    //   cert: fs.readFileSync("../file.crt"),
    // },
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, "/api"),
    //     secure: false, // 不验证安全证书
    //   },
    // },
  },
})
