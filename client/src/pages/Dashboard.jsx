import { useEffect, useState } from "react";
import axios from "axios";

import "./Dashboard.css";

import { FaRocket,FaServer,FaTrash,FaExternalLinkAlt,FaMicrochip, FaClock}
 from "react-icons/fa";

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
  <div className="dashboard">

    <div className="section-title">
      <FaServer /> PhoneHost
    </div>

    {stats && (
      <div className="stats-card">

        <div className="stats-heading">
          Server Stats
        </div>

        <div className="stats-line"></div>

        <div className="stats-grid">

          <div className="stat-box">
            <FaMicrochip size={35}/>
            <h3>CPU Usage</h3>
            <p>{stats.cpu}%</p>
          </div>

          <div className="stat-box">
            <FaMicrochip size={35}/>
            <h3>RAM Usage</h3>
            <p>{stats.ram}%</p>
          </div>

          <div className="stat-box">
            <FaClock size={35}/>
            <h3>Uptime</h3>
            <p>{stats.uptime}</p>
          </div>

        </div>
      </div>
    )}

    <div className="section-title">
      My Deployments
    </div>

    <div className="deployments">
      {sites.map((site) => (
        <div
          className="site-card"
          key={site._id}
        >
          <h3>{site.projectName}</h3>

          <p className="site-url">
            {site.deployedUrl}
          </p>

          <a
            className="visit-link"
            href={site.deployedUrl}
            target="_blank"
            rel="noreferrer"
          >
            Visit Site <FaExternalLinkAlt />
          </a>

          <br />

          <button
            className="delete-btn"
            onClick={() => deleteSite(site._id)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      ))}
    </div>

  </div>
);
}

export default Dashboard;