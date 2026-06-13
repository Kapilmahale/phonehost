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
  <div className="deploy-header">

    {/* Title + Logout Row */}
    <div className="header-row">

      <div className="header-spacer"></div>

      <div className="hero">
        <h1>
          <FaRocket />
          Deploy <span>Website</span>
        </h1>
      </div>

      <button
        className="action-btn logout-btn"
        onClick={logout}
      >
        <HiOutlineArrowRightOnRectangle size={18} />
        Logout
      </button>

    </div>

    {/* Upload Row */}
    <div className="upload-section">

      <label className="file-btn">
        <HiOutlineDocumentText size={18} />
        Choose File

        <input
          type="file"
          hidden
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />
      </label>

      <span className="file-name">
        {file ? file.name : "No file chosen"}
      </span>

      <button
        className="action-btn deploy-btn"
        onClick={deploySite}
      >
        <HiOutlinePaperAirplane size={18} />
        Deploy
      </button>

    </div>

  </div>
);
}

export default Deploy;