import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
import moment from "moment";

const taskRef = firebase
  .firestore()
  .collection("tasks")
  .where("userId", "==", "EQDzlniTwHc9sEzeWbaN")
  .orderBy("date", "desc")

export const Statistical = ({ showStatistical, setShowStatistical }) => {
  const [activeTab, setActiveTab] = useState("not-archive");
  const [tasks, setTasks] = useState([]);
  const [notArchiveTasks, setNotArchiveTasks] = useState([]);
  const [archiveTasks, setArchiveTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = taskRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(data);

      const notArchiveTasks = data.filter((task) => task.archived === false).slice(0,10).sort((a, b) => moment(b.date, "DD/MM/YYYY") - moment(a.date, "DD/MM/YYYY"));
      setNotArchiveTasks(notArchiveTasks);

      const archiveTasks = data.filter(
        (task) =>
          task.archived === false && task.date === moment().format("DD/MM/YYYY").slice(0,10)
      );
      setArchiveTasks(archiveTasks);

      const archivedTasks = data.filter((task) => task.archived === true).slice(0,10);
      setArchivedTasks(archivedTasks);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="popper" data-testid="popper-comp">
      {showStatistical && (
        <div
          className="productivity-stat-popper"
          data-testid="productivity-stat-popper"
        >
          <>
            <div className="header">
              <h1 tabIndex="-1" className="no-focus-marker">
                Hoạt động của bạn
              </h1>
            </div>
            <div className="productivity-stat-popper-content">
              <div className="completed-quick-viz">
                <div className="tab-lists">
                  <div className="tab-lists-container">
                    <div
                      role="tablist"
                      aria-orientation="horizontal"
                      aria-label="Stats by category"
                      className="tab-list"
                    >
                      <div className="tab-list-container">
                        <button
                          data-command
                          id="not-archive"
                          aria-selected={activeTab === "not-archive"}
                          role="tab"
                          className="tab-not-archive-button"
                          onClick={() => setActiveTab("not-archive")}
                          tabIndex="-1"
                          type="button"
                        >
                          Chưa hoàn thành
                        </button>

                        <button
                          data-command
                          id="archive"
                          aria-selected={activeTab === "archive"}
                          role="tab"
                          className="tab-archive-button"
                          type="button"
                          tabIndex="-1"
                          onClick={() => setActiveTab("archive")}
                        >
                          Phải hoàn thành
                        </button>

                        <button
                          data-command
                          id="archived"
                          aria-selected={activeTab === "archived"}
                          role="tab"
                          className="tab-archived-button"
                          type="button"
                          tabIndex="-1"
                          onClick={() => setActiveTab("archived")}
                        >
                          Đã hoàn thành
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  role="tabpanel"
                  className={`tab-panel ${
                    activeTab === "not-archive" ? "" : "hidden"
                  }`}
                  aria-labelledby="not-archive"
                  selected={activeTab === "not-archive" ? true : false}
                >
                  <div className="goal-status section_progress">
                    <div>
                      <h4>
                        Nhiệm vụ chưa hoàn thành:{"  "}{" "}
                        <b>
                          {notArchiveTasks.length}/{tasks.length} nhiệm vụ
                        </b>
                      </h4>
                      <p>Vạn sự khởi đầu nan, gian nan bắt đầu nản</p>
                    </div>
                  </div>

                  <div className="section_completebar">
                    <h6 className="section_title">
                      Hãy nhớ và thực hiện nhiệm vụ
                    </h6>
                    <div className="completed_bar_chart">
                      <ul>
                        {notArchiveTasks.map((task, index) => (
                          <li key={task.id}>
                            <span className="short_date">{index + 1}</span>
                            <b>{task.task}</b>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  role="tabpanel"
                  className={`tab-panel ${
                    activeTab === "archive" ? "" : "hidden"
                  }`}
                  aria-labelledby="archive"
                  selected={activeTab === "archive" ? true : false}
                >
                  <div className="goal-status section_progress">
                    <div>
                      <h4>
                        Nhiệm vụ cần hoàn thành trong ngày hôm nay:{"  "}
                        <b>
                          {archiveTasks.length}/{tasks.length} nhiệm vụ
                        </b>
                      </h4>
                      <p>Giữ vững phong độ nhé!</p>
                    </div>
                  </div>

                  <div className="section_completebar">
                    <h6 className="section_title">Cần hoàn thành nhiệm vụ</h6>
                    <div className="completed_bar_chart">
                      <ul>
                        {archiveTasks.map((task, index) => (
                          <li key={task.id}>
                            <span className="short_date">{index + 1}</span>
                            <b>{task.task}</b>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div
                  role="tabpanel"
                  aria-labelledby="archived"
                  className={`tab-panel ${
                    activeTab === "archived" ? "" : "hidden"
                  }`}
                  selected={activeTab === "archived" ? true : false}
                >
                  <div className="goal-status section_progress">
                    <div>
                      <h4>
                        Nhiệm vụ đã hoàn thành: {"  "}
                        <b>
                          {archivedTasks.length}/{tasks.length} nhiệm vụ
                        </b>
                      </h4>
                      <p>
                        Tương lai khóc hay cười phụ thuộc vào độ lười của quá
                        khứ
                      </p>
                    </div>
                  </div>

                  <div className="section_completebar">
                    <h6 className="section_title">
                      Chúc mừng, bạn đã tốt hơn ngày hôm qua 1% rồi đấy!
                    </h6>
                    <h6 className="section_title">
                      Hãy hoàn thành nhiệm vụ tiếp theo để tốt hơn nhé!
                    </h6>
                    <div className="completed_bar_chart">
                      <ul>
                        {archivedTasks.map((task, index) => (
                          <li key={task.id}>
                            <span className="short_date">{index + 1}</span>
                            <b>{task.task}</b>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};
