import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    global: "window"
  },
  server: {
    // https: {
    //   key: fs.readFileSync("./localhost+2-key.pem"),
    //   cert: fs.readFileSync("./localhost+2.pem")
    // },
    host: "localhost",
    port: 3000
  }
});
