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

      context: {
        bambini: [{item: "<b>potato</b>"}, {item: "batato"}, {item: "tomato"}, {item: "rotato"}],
        accounts: [
          {name: "John", email: "john@example.com"},
          {name: "Malcolm", email: "malcolm@example.com"},
          {name: "David", email: "david@example.com"},
        ],
        data: {
          item: [
            {
              name: "Test 1",
              keywords: ["[asdad,dasdas]"],
              description: "xxzfrfa",
              test: 12.3,
              id: "584ab61344be2bd806ef276d",
            },
            {
              name: "My test 2",
              keywords: ["[zx,zz]"],
              description: "xz",
              test: 53,
              id: "584ab67b11b75c3a10fc1518",
            },
          ],
        },
      },
      helpers: {
        // pageTitle: function (value) {
        //   return value;
        // },
        parseJSON: function (data, options) {
          return options.fn(JSON.parse(data));
        },

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
          
          
          

          console.log(result);
        },
      },
      compileOptions: {
        // Example config option: avoid auto-indenting partials
        preventIndent: true,
      },
      runtimeOptions: {
        // Example config option: define custom private @variables
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        about: resolve(__dirname, "/pages/about.html"),
        main: resolve(__dirname, "index.html"),
      },
    },
  },
};

