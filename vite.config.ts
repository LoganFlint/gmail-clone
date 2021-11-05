import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import icons from "unplugin-icons/vite";
import iconsResolver from "unplugin-icons/resolver";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    components({
      dts: "src/copmonents.d.ts",
      resolvers: [
        iconsResolver({
          prefix: "i",
        }),
      ],
    }),
    icons({
      compiler: "vue3",
    }),
  ],
});
