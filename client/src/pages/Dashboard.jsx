import { useEffect,useState } from "react";
import axios from "axios";
const token = localStorage.getItem("token");


function Dashboard() {
  const [sites,setSites] = useState([]);

  const fetchSites = async () => {

    const token =localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/deploy", {
      headers: { Authorization: token }
    });

    setSites(res.data);
  };

  useEffect(() => {fetchSites();}, []);

  const deleteSite =async(id)=>{

    await axios.delete(`http://localhost:5000/api/deploy/${id}`,
    {
    headers:{ Authorization:token}
    });

    fetchSites();
  };

  return (
  <div style={{ maxWidth: "900px", margin: "auto",padding: "20px", }}>
    <h2>PhoneHost</h2>

    <h2>My Deployments</h2>

    {sites.length === 0 ? (
      <p>No deployments found.</p>
    ) : (
      sites.map((site) => (
        <div key={site._id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
          }} >

          <h3>{site.projectName}</h3>

          <p>{site.deployedUrl}</p>

          <a href={site.deployedUrl} target="_blank" rel="noreferrer">
            Visit Site
          </a>

          <br />
          <br />

          <button onClick={() => deleteSite(site._id) }>
            Delete
          </button>
        </div>
      ))
    )}
  </div>
  );
}

export default Dashboard;