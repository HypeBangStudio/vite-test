// vite.config.js
import {resolve} from "path";
import handlebars from "vite-plugin-handlebars";


export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "partials"),
      layoutsDirectory: resolve(__dirname, "layouts"),

      context: {},
      helpers: {
        pageTitle: function (value) {
          return value;
        },
      },
      compileOptions: {
        // Example config option: avoid auto-indenting partials
        preventIndent: true,
      },
      runtimeOptions: {
        // Example config option: define custom private @variables
        data: {
          title: "Yehuda",
        },
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        about: resolve(__dirname, 'pages/about.html'),
        main: resolve(__dirname, 'index.html'),

        // aboutjs: resolve(__dirname, 'about.js')
      },
    },
  },
};

