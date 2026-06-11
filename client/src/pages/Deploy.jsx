import { useState } from "react";
import axios from "axios";

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};


function Deploy() {
  const [file, setFile] =useState(null);
  const [url,setUrl] = useState("");
  const [deployedSite,setDeployedSite]= useState(null);


  const deploySite = async () => {
      try {

        const token =localStorage.getItem("token");

        const formData =new FormData();

        formData.append("project",file);

        const res =await axios.post( "http://localhost:5000/api/deploy",formData, {
        headers:{Authorization:token}
      }

);

        console.log(res.data);
        setUrl(res.data.deployedUrl);
        setDeployedSite(res.data.site);

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <h1>
        Deploy Website
      </h1>

      <input type="file" onChange={(e) => setFile( e.target.files[0])}/>

      <button onClick={deploySite}> Deploy </button>

      { url && (<a href={url} target="_blank" rel="noreferrer">
      Open Website </a> )}

      <button onClick={logout} color="red" style={{marginTop: "20px",marginLeft: "10px",}}>
      Logout 
    </button>

    </div>
  );
}

export default Deploy;