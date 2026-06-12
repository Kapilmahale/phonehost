import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [sites, setSites] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchSites = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "/api/deploy",
        {
          headers: {
            Authorization: token
          }
        }
      );

      setSites(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchStats = async () => {
    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "/api/stats",
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log("Stats:", res.data);

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchSites();
    fetchStats();

    const interval =
      setInterval(fetchStats, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const deleteSite = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(
        `/api/deploy/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      fetchSites();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px"
      }}
    >

      <h2>PhoneHost</h2>

      {stats && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        >
          <h2>Server Stats</h2>

          <p>
            CPU Usage: {stats.cpu}%
          </p>

          <p>
            RAM Usage: {stats.ram}%
          </p>

          <p>
            Uptime: {stats.uptime}
          </p>

        </div>
      )}

      <h2>My Deployments</h2>

      {sites.length === 0 ? (
        <p>No deployments found.</p>
      ) : (
        sites.map((site) => (
          <div
            key={site._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px"
            }}
          >

            <h3>{site.projectName}</h3>

            <p>{site.deployedUrl}</p>

            <a
              href={site.deployedUrl}
              target="_blank"
              rel="noreferrer"
              style={{color:"blueviolet"}}
            >
              Visit Site
            </a>

            <br />
            <br />

            <button
              onClick={() =>
                deleteSite(site._id)
              }
              style={{background:"Red"}}
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;