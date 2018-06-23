// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

"use strict";

const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyDbZA-zf_KYp0CsREIotlVAhnxxg3LCF8o",
  authDomain: "actions-codelab-fc3a8.firebaseapp.com",
  databaseURL: "https://actions-codelab-fc3a8.firebaseio.com",
  projectId: "actions-codelab-fc3a8",
  storageBucket: "actions-codelab-fc3a8.appspot.com",
  messagingSenderId: "659595956569"
};

firebase.initializeApp(config);

function writeLog(userId, log) {
  firebase
    .database()
    .ref("test/" + userId)
    .set({
      log: log
    });
}

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow } = require("actions-on-google");

// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

app.intent("ask-elaboration", (conv, { text, emotions }) => {
  writeLog(new Date().toString(), "hello");
  const body = JSON.stringify({
    log: text
  });
  https.request(options, callback).end(body);
  conv.followup("ask-blaming-event", { emotions });
});

app.intent("ask-blaming - yes", conv => {
  conv.followup("ask-rephrase-event");
});

app.intent("ask-rephrase", conv => {
  conv.followup("ask-about-feelings-event");
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
