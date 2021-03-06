import React, { Component } from "react";
import firebase from "../firebase/Firebase.js";
class uploadPic extends Component {
  state = {
    imageAsFile: null,
    imgUrl: "",
    imageAsUrl: "",
    uploadStatus: " 0/0 ",
  };

  handleImageAsFile = (e) => {
    const image = e.target.files[0];
    this.setState({
      imageAsFile: image,
    });
    if (image) {
      this.setState({ imageAsUrl: URL.createObjectURL(image) });
    } else {
      this.setState({ imageAsUrl: null });
    }
  };
  handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log("start of upload");
    // async magic goes here...
    if (this.state.imageAsFile === "") {
      console.error(
        `not an image, the image file is a ${typeof this.state.imageAsFile}`
      );
    }
    const uploadTask = firebase
      .storage()
      .ref(
        `users/${this.props.currentUserid}/${this.props.currentItemUid}/pic01`
      )
      .put(this.state.imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
        this.setState({
          uploadStatus:
            " " + snapShot.bytesTransferred + "/" + snapShot.totalBytes + " ",
        });
      },
      (err) => {
        //catches the errors
        alert("Your Pic is more than 5MB or it's not a Pic");
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        alert("Upload success !!!");
        firebase
          .storage()
          .ref(
            "users/" +
              this.props.currentUserid +
              "/" +
              this.props.currentItemUid
          )
          .child("pic01")
          .getDownloadURL()
          .then((fireBaseUrl) => {
            this.setState({ imgUrl: fireBaseUrl });
            const db = firebase.firestore();
            let updateNested = db
              .collection("items")
              .doc(this.props.currentItemUid)
              .update({
                pic: fireBaseUrl,
              })
              .then((res) => {
                this.handleSuccess();
              });
          });
      }
    );
  };
  handleSuccess = (e) => {
    window.location.href = "/item/" + this.props.currentItemUid;
  };

  render() {
    return (
      <form className="uploadPic" onSubmit={this.handleFireBaseUpload}>
        <b style={{ fontSize: "26px" }}>เพิ่มรูปภาพ</b>
        <b>Upload Status : {this.state.uploadStatus} bytes</b>
        <img
          style={{ padding: "10px" }}
          src={this.state.imageAsUrl}
          width="500px"
        />
        <input type="file" onChange={this.handleImageAsFile} />
        <button>Upload</button>
        <button
          onClick={this.handleSuccess}
          style={{ backgroundColor: "grey" }}
        >
          Skip
        </button>
      </form>
    );
  }
}

export default uploadPic;
