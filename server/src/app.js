const express = require("express");
const axios = require("axios");
const cors = require("cors");
const JSZip = require("jszip");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

function checkUrlPieces(url) {
  const urlPieces = url.split("/");
  const user = urlPieces[3];
  const repo = urlPieces[4];
  const branch = urlPieces[6] || "main";
  const path = urlPieces.slice(7).join("/");
  const folderName = urlPieces[urlPieces.length - 1];
  return { user, repo, branch, path, folderName };
}

async function fetchContents(user, repo, branch, basePath, tree, zip) {
  const fileUrls = tree
    .filter((item) => item.type === "blob" && item.path.startsWith(basePath))
    .map((item) => item.path);

  const download = fileUrls.map(async (url) => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${url}`,
        {
          responseType: "arraybuffer",
        }
      );

      const filePath = url.substring(basePath.length);

      if (url.endsWith(".json")) {
        const fileContent = new TextDecoder().decode(response.data);
        zip.file(filePath, fileContent);
      } else {
        zip.file(filePath, response.data);
      }
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
    }
  });

  await Promise.all(download);
}

app.post("/fetch", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send("GitHub URL is required");
  }

  try {
    const { user, repo, branch, path, folderName } = checkUrlPieces(url);

    if (!user || !repo || !branch || !path || !folderName) {
      throw new Error("Invalid GitHub URL");
    }

    const response = await axios.get(
      `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
    );
    const data = response.data.tree;

    const zip = new JSZip();
    await fetchContents(user, repo, branch, path, data, zip);

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${folderName}.zip"`
    );

    const zipStr = zip.generateNodeStream({
      type: "nodebuffer",
      streamFiles: true,
    });

    zipStr.pipe(res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error fetching folder contents , mf check your url.");
  }
});

app.get("/", (req, res) => {
  res.send("hi from backend");
});

module.exports = app;
