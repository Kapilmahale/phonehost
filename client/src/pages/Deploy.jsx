import { useState } from "react";
import axios from "axios";

import "./Dashboard.css";
import { FaRocket} from "react-icons/fa";
import {
  HiOutlineDocumentText,
  HiOutlinePaperAirplane,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";



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

        const res =await axios.post( "/api/deploy",formData, {
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
  <div className="top-actions">

    <div className="hero">
          <h1>
            <FaRocket /> Deploy <span>Website</span>
          </h1>
        </div>

    <input
      type="file"
      onChange={(e) =>
        setFile(e.target.files[0])
      }
    />

    <button
      className="action-btn deploy-btn"
      onClick={deploySite}
    >
      Deploy
    </button>

    <button
      className="action-btn logout-btn"
      onClick={logout}
    >
      Logout
    </button>

  </div>
);
}

export default Deploy;