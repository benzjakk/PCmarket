const functions = require("firebase-functions");
const firebase_tools = require("firebase-tools");
const admin = require("firebase-admin");
const firebase = admin.initializeApp();
const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);
  res.send(number.toString());
});

exports.sayHello = functions.https.onCall((data, context) => {
  const name = data.name;
  return `hello ${name} :)`;
});

//delete Post + all subcollections

exports.recursiveDelete = functions
  .region("asia-east2")
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB",
  })
  .https.onCall(async (data, context) => {
    // Only allow admin users to execute this function.
    /*if (!(context.auth && context.auth.token && context.auth.token.admin)) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Must be an administrative user to initiate delete."
      );
    }*/

    const path = data.path;
    console.log(
      `User ${context.auth.uid} has requested to delete path ${path}`
    );

    // Run a recursive delete on the given document or collection path.
    // The 'token' must be set in the functions config, and can be generated
    // at the command line by running 'firebase login:ci'.
    await firebase_tools.firestore.delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().ci_token,
    });

    return {
      result: "delete success",
    };
  });

//delete pic in firebase storage when delete Post in Firestore
exports.deletePhotos = functions
  .region("asia-east2")
  .firestore.document("items/{postId}")
  .onDelete((snap, context) => {
    console.log(
      `User ${context.auth.uid} has requested to delete pic on post ${postId}`
    );
    const { postId } = context.params;
    const userId = snap.get("seller");
    const bucket = firebase.storage().bucket();
    return bucket.deleteFiles({
      prefix: `users/${userId}/${postId}`,
    });
  });

//add item to catefolder
/*exports.addItemCategory = functions
  .region("asia-east2")
  .firestore.document("items/{postId}")
  .onCreate(async (snap, context) => {
    const { postId } = context.params;
    const cate = snap.get("cate");
    console.log(snap.get("cate"));
    // Add a new document in collection "cities" with ID 'LA'
    const res = await db.collection(cate).doc(postId).set({ cate: "cpu" });
  });
*/
