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
        `users/${this.props.currentUserid}/items/${this.props.currentItemUid}/pic01`
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
        if (snapShot.bytesTransferred == snapShot.totalBytes) {
          alert("Upload success !!!");
        }
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        firebase
          .storage()
          .ref(
            "users/" +
              this.props.currentUserid +
              "/items/" +
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
      <form
        className="uploadPic"
        onSubmit={this.handleFireBaseUpload}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "50px",
          backgroundColor: "#2b0091",
        }}
      >
        <b style={{ color: "yellow" }}>
          Upload Status : {this.state.uploadStatus} bytes
        </b>
        <img
          style={{ padding: "10px" }}
          src={this.state.imageAsUrl}
          width="100px"
        />
        <input type="file" onChange={this.handleImageAsFile} />
        <button>Upload Picture</button>
        <button onClick={this.handleSuccess}>Skip</button>
      </form>
    );
  }
}

export default uploadPic;
