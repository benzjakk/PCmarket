import firebase from "../firebase/Firebase.js";
export function fetchResult() {
  let items = [];
  const db = firebase.firestore();
  db.collection("items")
    .where("cate", "==", "CPU")
    .orderBy("time", "desc")
    .get()
    .then((res) => {
      res.forEach((doc) => {
        //console.log(doc.data());

        items.push(doc.data());
      });
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(items);
  return items;
}
