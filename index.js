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

const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./actions-codelab-ff7f90d6cddb.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://actions-codelab-fc3a8.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("test");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

function writeLog(userId, log) {
  ref.set({
    log: log
  });
}

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow } = require("actions-on-google");

// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

writeLog(new Date().toString(), "hello");
app.intent("ask-about-day", conv => {
  conv.ask(
    '<speak><par><media xml:id="sparkle"><audio src="https://github.com/adnida/lumos/raw/master/media/sparkle.mp3"/></media><media xml:id="words" begin="sparkle.end-3s"><speak>Good evening Bella! Did anything interesting happen today?</speak></media></par></speak>'
  );
  conv.followup("ask-about-feelings-event");
});

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

app.intent("ask-physical", conv => {
  if (!conv.surface.capabilities.has("actions.capability.SCREEN_OUTPUT")) {
    conv.ask(
      "Sorry, try this on a screen device or select the " +
        "phone surface in the simulator."
    );
    return;
  }
  // Create a list
  conv.ask(
    new List({
      title: "Schedule",
      items: {
        // Add the first item to the list
        [SELECTION_KEY_PURE_YOGA]: {
          synonyms: ["pure yoga"],
          title: "Pure Yoga, tomorrow at 3pm",
          description: "Orchard Road",
          image: new Image({
            url: "http://www.pure-yoga.com/asset/image/pure-menu-logo.png",
            alt: "Pure Yoga Logo"
          })
        }
      }
    })
  );
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
