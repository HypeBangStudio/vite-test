/** @format */

// vite.config.js
import {resolve} from "path";
import handlebars from "vite-plugin-handlebars";
var helpers = require("handlebars-helpers")();
const axios = require("axios");
import fs from "fs";
import dummyjson from "dummy-json";



export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "partials"),
      layoutsDirectory: resolve(__dirname, "layouts"),

      context: {},
      helpers: {
        createJSON: function (myTemplate, fileName) {
          const template = fs.readFileSync(`jnerator/${myTemplate}`, {encoding: "utf8"});
          const result = dummyjson.parse(template);
          fs.writeFile(`src/json/${fileName}.json`, result, (err) => {
            if (err) console.log(err);
            else {
              console.log(`${fileName}.json written successfully\n`);
              // console.log("The written has the following contents:");
              // console.log(fs.readFileSync("src/json/myTemplate.json", "utf8"));
            }
          });
        },

        // JSON: function (path, options) {
        //   try {
        //     const data = fs.readFileSync(path, "utf8");
        //     console.log(file);
        //     return options.fn(JSON.parse(data));
        //   } catch (err) {
        //     console.error(err);
        //   }
        // },

        readJSON: function (input, options) {
          const file = fs.readFileSync(`${input}`, {encoding: "utf8"});
          return options.fn(JSON.parse(file));
        },

        // jsonAPI: function (url, options) {
        //   try {
        //     fetch(url, {method: "Get"})
        //       .then((res) => res.json())
        //       .then((json) => {
        //         return "ciao";
        //         return json;
        //       });
        //   } catch (err) {
        //     console.error(err);
        //   }
        // }
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

      build: {
        rollupOptions: {
          input: {
            about: resolve(__dirname, "/pages/about.html"),
            main: resolve(__dirname, "index.html"),

            // aboutjs: resolve(__dirname, 'about.js')
          },
        },
      },
    }),
  ],
};
