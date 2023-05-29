import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaRegTimesCircle, FaSearch } from "react-icons/fa";
import { firebase } from "../../firebase";

const taskRef = firebase
  .firestore()
  .collection("tasks")
  .where("userId", "==", "EQDzlniTwHc9sEzeWbaN");

export const Search = () => {
  const inputRef = useRef();
  const [search, setSearch] = useState("");
  const [tasks, setTasks] = useState([]);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const unsubscribe = taskRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(data);
    });
    return unsubscribe;
  }, []);

  const handleChange = (value) => {
    setSearch(value);
    setResults(
      tasks.filter(
        (task) =>
          task.task.toLowerCase().includes(value.toLowerCase()) &&
          task.archived === false
      )
    );
  };

  const handleClear = () => {
    setSearch("");
    inputRef.current.focus();
  };

  const archiveTask = (id) => {
    //update archived thanh true trong tasks
    firebase.firestore().collection("tasks").doc(id).update({
      archived: true,
    });
    setSearch("");
  };

  return (
    <div className="search">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          autoComplete="off"
          aria-label="Quick Search"
          type="text"
          placeholder="Nhập vào đây"
          onChange={(e) => handleChange(e.target.value)}
          ref={inputRef}
          value={search}
          onFocus={() => setShowResults(true)}
        />

        <button
          onClick={handleClear}
          className="close_icon"
          aria-label="Close Search"
        >
          <FaRegTimesCircle />
        </button>
      </div>
      {search !== "" && showResults && (
        <div className="search-result">
          {results.map((result) => (
            <div
              className="data-item"
              key={result.id}
              onClick={() => archiveTask(result.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") archiveTask(result.id);
              }}
            >
              <FaCheckCircle />
              <p>{result.task}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
