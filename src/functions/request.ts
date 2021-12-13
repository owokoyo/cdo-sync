import FormData = require("form-data");
import fetch from "node-fetch";
import * as vscode from "vscode";
import * as fs from "fs";
import { library } from "./types";
import state from "./state";

function getCSRF(projectId: string, cookie: string) {
  return fetch(`https://studio.code.org/projects/gamelab/${projectId}/edit`, {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "if-none-match": 'W/"609918c0b2b1b526be4bd147ccbe4158"',
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      cookie: cookie,
    },
    //    referrerPolicy: "strict-origin-when-cross-origin",
    method: "GET",
    //    mode: "cors",
  })
    .then((e) => e.text())
    .then(
      (e) =>
        (e.match(/<meta name="csrf-token" content="(.+?)">/) as string[])[1]
    );
}

function getMetadata(projectId: string) {
  return fetch(`https://studio.code.org/v3/channels/${projectId}`).then((r) =>
    r.text()
  );
}

function getSource(projectId: string) {
  return fetch(
    `https://studio.code.org/v3/sources/${projectId}/main.json`
  ).then((r) => r.text());
}

function syncSource(
  source: string,
  csrf: string,
  channelId: string,
  cookie: string
) {
  fetch(`https://studio.code.org/v3/sources/${channelId}/main.json`, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-newrelic-id": "UQYGVVBQGwAHXFZRAQU=",
      "x-requested-with": "XMLHttpRequest",
      "x-csrf-token": csrf,
      cookie: cookie,
    },
    body: source,
    method: "PUT",
  }).then(e=>{
    console.log(e);
  }).catch(e=>{console.log(e);});
  vscode.window.showInformationMessage("Updating Source");
  state.sourceUpdatedCallback();
}

function syncMetadata(
  metadata: string,
  csrf: string,
  channelId: string,
  cookie: string
) {
  fetch(`https://studio.code.org/v3/channels/${channelId}`, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
      "sec-ch-ua":
        '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-newrelic-id": "UQYGVVBQGwAHXFZRAQU=",
      "x-requested-with": "XMLHttpRequest",
      "x-csrf-token": csrf,
      cookie: cookie,
    },
    body: metadata,
    method: "PUT",
  });
  vscode.window.showInformationMessage("Updating Metadata");
}

function uploadFileAsAnimation(
  absFilePath: string,
  fileName: string,
  csrf: string,
  channelId: string,
  cookie: string
) {
  vscode.window.showInformationMessage("Uploading: " + fileName);
  var form = new FormData();
  form.setBoundary("----WebKitFormBoundaryEN53T9q0vZBGYpR1");
  form.append("files[]", fs.readFileSync(absFilePath), fileName);
  return fetch(
    `https://studio.code.org/v3/animations/${channelId}/${fileName}`,
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundaryEN53T9q0vZBGYpR1",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrf-token": csrf,
        "x-newrelic-id": "UQYGVVBQGwAHXFZRAQU=",
        "x-requested-with": "XMLHttpRequest",
        cookie: cookie,
      },
      body: form,
      method: "POST",
    }
  );
}

type LibraryReturnResult = { versionId: string, lastModified: string, isLatest: boolean }[];
function getLibraryVersions(channelId: string): Promise<LibraryReturnResult> {
  return fetch(
    `https://studio.code.org/v3/libraries/${channelId}/library.json/versions`
  ).then((r) => r.json());
}

function getLibrary(channelId: string, versionId?: string): Promise<library> {
  return fetch(
    `https://studio.code.org/v3/libraries/${channelId}/library.json${versionId ? `?versionId=${versionId}` : ``}`
  ).then((r) => r.json()).then(JSON.parse);
}

export {
  getCSRF,
  getMetadata,
  getSource,
  syncSource,
  syncMetadata,
  uploadFileAsAnimation,
  getLibraryVersions,
  getLibrary,
  LibraryReturnResult
};
