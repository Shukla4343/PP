import React, { useEffect, useState } from "react";
import { imgDB, txtDB } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";

function File() {
  const [txt, setTxt] = useState("");
  const [img, setImg] = useState("");
  const [pdf, setPdf] = useState("");
  const [uploading, setUploading] = useState(false); // Track upload status
  const [data, setData] = useState([]);

  const handleUpload = (e) => {
    setUploading(true); 
    
    const fileRef = ref(imgDB, `Files/${v4()}.${file.name.split('.').pop()}`);
  
    console.log("Uploading file...", file);
  
    uploadBytes(fileRef, file)
      .then((snapshot) => {
        console.log("File uploaded successfully. Snapshot:", snapshot);
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        console.log("Download URL:", url);
        if (file.type.startsWith("image/")) {
          setImg(url);
        } else if (file.type === "application/pdf") {
          setPdf(url);
        }
        setUploading(false); // Upload finished
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setUploading(false); // Upload finished with error
      });
  };
  
  const handleClick = async () => {
    const valRef = collection(txtDB, "txtData");
    await addDoc(valRef, { txtVal: txt, imgUrl: img, pdfUrl: pdf });
    alert("Data added successfully");
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  const getData = async () => {
    const valRef = collection(txtDB, "txtData");
    const dataDb = await getDocs(valRef);
    const allData = dataDb.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <br />
      <input onChange={(e) => setTxt(e.target.value)} />
      <br />
      <br />
      <input type="file" onChange={(e) => handleUpload(e)} />
      {uploading && <p>Uploading...</p>} 
      <br />
      <button onClick={handleClick}>Add</button>

      {data.map((value) => (
        <div key={value.id}>
          <h1>{value.txtVal}</h1>
          {value.imgUrl && (
            <div>
              <img src={value.imgUrl} height="200px" width="200px" alt="Uploaded" />
              <button onClick={() => openInNewTab(value.imgUrl)}>Open</button>
            </div>
          )}
          {value.pdfUrl && (
            <div>
              <iframe title="Uploaded PDF" src={value.pdfUrl} width="400px" height="300px" />
              <button onClick={() => openInNewTab(value.pdfUrl)}>Open</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default File;
