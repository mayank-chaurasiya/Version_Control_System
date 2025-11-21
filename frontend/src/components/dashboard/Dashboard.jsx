import "./dashboard.css";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(`16.170.225.81:3030/repo/user/${userId}`);

        const data = await response.json();
        // Extract repositories array from response
        setRepositories(data.repositories || []);
      } catch (error) {
        console.error("Error while fetching repository : ", error.message);
        setRepositories([]);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`16.170.225.81:3030/repo/all`);

        const data = await response.json();
        setSuggestedRepositories(data);
      } catch (error) {
        console.error("Error while fetching repository : ", error.message);
      }
    };
    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard" className="p-4 mt-2">
        <aside>
          <h3>Suggested Repository </h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div className="p-3" key={repo._id}>
                <h4>Repository Name : {repo.name}</h4>
                <p>Description : {repo.description}</p>
              </div>
            );
          })}
        </aside>
        <main>
          <h2>Your Repositories</h2>
          <div id="search" className="p-4">
            <input
              type="text"
              className="input"
              value={searchQuery}
              placeholder="repository Name"
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          {searchResults.map((repo) => {
            return (
              <div className="p-3" key={repo._id}>
                <h4>Repository Name : {repo.name}</h4>
                <p>Description : {repo.description}</p>
              </div>
            );
          })}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - 4th Jan</p>
            </li>
            <li>
              <p>React Summit - Dec 15</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
