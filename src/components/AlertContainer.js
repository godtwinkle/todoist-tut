import { useEffect } from "react";
import { useState } from "react";
import { firebase } from "../firebase";
import moment from "moment";

import { ToastContainer, toast } from "react-toastify";
export const AlertContainer = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tasksRef = firebase.firestore().collection("tasks");
      const snapshot = await tasksRef.get();
      const taskList = snapshot.docs.map((doc) => doc.data());
      setTasks(taskList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Tìm task sắp đến hạn gần nhất
    const today = moment().format("DD/MM/YYYY"); // Lấy ngày hôm nay
    const twoDaysAgo = moment().subtract(2, "day").format("DD/MM/YYYY"); // Lấy hai ngày trước

    const closestTasks = tasks.filter(
      (task) =>
        task.date !== "" && task.date >= twoDaysAgo && task.date <= today
    );

    closestTasks.sort((task1, task2) =>
      moment(task1.date, "DD/MM/YYYY").diff(moment(task2.date, "DD/MM/YYYY"))
    );

    let toastContent = ""; // Biến lưu trữ nội dung của các nhiệm vụ gần đến hạn

    closestTasks.forEach((closestTask) => {
      if (
        moment(closestTask.date, "DD/MM/YYYY").isBefore(
          moment().add(1, "day"),
          "day"
        )
      ) {
        // Cập nhật nội dung của toast
        toastContent += `${closestTask.task} - ${closestTask.date}<br>`;
      }
    });

    // Toast nội dung
    if (toastContent !== "") {
      toast.info(
        <div>
          <h3>Nhiệm vụ gần đến hạn</h3>
          <div dangerouslySetInnerHTML={{ __html: toastContent }} />
        </div>
      );
    }
  }, [tasks]);

  return (
    <div className="custom-toast-container">
      <ToastContainer
        toastClassName="custom-toast-container"
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
