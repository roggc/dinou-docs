require("./register-paths");
const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/[\\\/](build|server|node_modules)[\\\/]/],
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/transform-modules-commonjs"],
  extensions: [".js", ".jsx", ".ts", ".tsx"],
});
const addHook = require("./asset-require-hook.js");
const createScopedName = require("./createScopedName");
require("css-modules-require-hook")({
  generateScopedName: createScopedName,
});
addHook({
  extensions: [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "svg",
    "webp",
    "avif",
    "ico",
    "mp4",
    "webm",
    "ogg",
    "mov",
    "avi",
    "mkv",
    "mp3",
    "wav",
    "flac",
    "m4a",
    "aac",
    "mjpeg",
    "mjpg",
  ],
  name: function (localName, filepath) {
    const result = createScopedName(localName, filepath);
    return result + ".[ext]";
  },
  publicPath: "/assets/",
});

const { renderToPipeableStream } = require("react-dom/server");
const getJSX = require("./get-jsx");
const getSSGJSX = require("./get-ssg-jsx.js");
const { getErrorJSX } = require("./get-error-jsx");
const { renderJSXToClientJSX } = require("./render-jsx-to-client-jsx");
const isDevelopment = process.env.NODE_ENV !== "production";

function formatErrorHtml(error) {
  const message = error.message || "Unknown error";
  const stack = error.stack
    ? error.stack.replace(/\n/g, "<br>").replace(/\s/g, "&nbsp;")
    : "No stack trace available";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f8f8f8;
          color: #333;
        }
        .error-container {
          max-width: 800px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .error-title {
          color: #d32f2f;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .error-message {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .error-stack {
          background-color: #f5f5f5;
          padding: 15px;
          border-radius: 4px;
          font-family: Consolas, monospace;
          font-size: 14px;
          overflow-x: auto;
        }
        .error-footer {
          margin-top: 20px;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <h1 class="error-title">An Error Occurred</h1>
        <p class="error-message">${message}</p>
        <div class="error-stack">${stack}</div>
      </div>
    </body>
    </html>
  `;
}

function formatErrorHtmlProduction(error) {
  const escapedMessage = JSON.stringify(`Render error: ${error.message}`);
  const escapedStack = JSON.stringify(error.stack || "");

  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"></head>
      <body>
        <script>
          console.error(${escapedMessage} + "\\n" + ${escapedStack});
        </script>
      </body>
    </html>
  `;
}

async function renderToStream(reqPath, query) {
  try {
    const jsx =
      Object.keys(query).length || isDevelopment
        ? renderJSXToClientJSX(await getJSX(reqPath, query))
        : getSSGJSX(reqPath) ??
          renderJSXToClientJSX(await getJSX(reqPath, query));

    const stream = renderToPipeableStream(jsx, {
      onError(error) {
        const isProd = process.env.NODE_ENV === "production";

        try {
          const errorJSX = getErrorJSX(reqPath, query, error);

          if (errorJSX === undefined) {
            process.stdout.write(
              isProd ? formatErrorHtmlProduction(error) : formatErrorHtml(error)
            );
            process.stderr.write(
              JSON.stringify({ error: error.message, stack: error.stack })
            );
            process.exit(1);
          }

          const errorStream = renderToPipeableStream(errorJSX, {
            onShellReady() {
              errorStream.pipe(process.stdout);
            },
            onError(err) {
              console.error("Error rendering error JSX:", err);
              process.stdout.write(
                isProd
                  ? formatErrorHtmlProduction(error)
                  : formatErrorHtml(error)
              );
              process.stderr.write(
                JSON.stringify({ error: error.message, stack: error.stack })
              );
              process.exit(1);
            },
            bootstrapScripts: ["/error.js"],
            bootstrapScriptContent: `window.__DINOU_ERROR_MESSAGE__=${JSON.stringify(
              error.message || "Unknown error"
            )};window.__DINOU_ERROR_STACK__=${JSON.stringify(
              error.stack || "No stack trace available"
            )};`,
          });
        } catch (err) {
          console.error("Render error (no error.tsx?):", err);
          process.stdout.write(
            isProd ? formatErrorHtmlProduction(error) : formatErrorHtml(error)
          );
          process.stderr.write(
            JSON.stringify({ error: error.message, stack: error.stack })
          );
          process.exit(1);
        }
      },
      onShellReady() {
        stream.pipe(process.stdout);
      },
      bootstrapScripts: ["/main.js"],
    });
  } catch (error) {
    process.stdout.write(formatErrorHtml(error));
    process.stderr.write(
      JSON.stringify({
        error: error.message,
        stack: error.stack,
      })
    );
    process.exit(1);
  }
}

const reqPath = process.argv[2];
const query = JSON.parse(process.argv[3]);

process.on("uncaughtException", (error) => {
  process.stdout.write(formatErrorHtml(error));
  process.stderr.write(
    JSON.stringify({
      error: error.message,
      stack: error.stack,
    })
  );
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  const error = reason instanceof Error ? reason : new Error(String(reason));
  process.stdout.write(formatErrorHtml(error));
  process.stderr.write(
    JSON.stringify({
      error: error.message,
      stack: error.stack,
    })
  );
  process.exit(1);
});

renderToStream(reqPath, query);
