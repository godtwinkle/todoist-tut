import { useState, useEffect } from "react";
import moment from "moment";
import { firebase } from "../firebase";
import { collatedTasksExist } from "../helpers";

export const useTasks = (selectedProject) => {
  //dat trang thai cua task
  const [tasks, setTasks] = useState([]);

  //xem task da hoan thanh chua
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    //truy van du lieu voi id cua user
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "EQDzlniTwHc9sEzeWbaN");

    //neu co chon project thi truy van du lieu voi id cua project
    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? //neu co thi projectId = selectedProject(inbox, today, next_7)
          (unsubscribe = unsubscribe.where("projectId", "==", selectedProject))
        : //neu khong chon project thi chon project la today
        selectedProject === "TODAY"
        ? //neu chon project la today thi truy van du lieu voi ngay hien tai
          (unsubscribe = unsubscribe.where(
            "date",
            "==",
            moment().format("DD/MM/YYYY")
          ))
        : //neu khong chon project thi se tu dong chon inbox
        selectedProject === "INBOX" || selectedProject === 0
        ? //voi ngay tao la rong
          (unsubscribe = unsubscribe.where("date", "==", ""))
        : //neu khong thi khong co gi thay doi
          unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapshot) => {
      //lay thong tin cua new tasks
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        //neu chon project trong 7 ngay toi
        selectedProject === "NEXT_7"
          ? //se loc ra nhung tasks
            newTasks.filter(
              //loc  task tao  trong vong 7 ngay ma chua hoan thanh
              (task) =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : //loc task chua hoan thanh
            newTasks.filter((task) => task.archived !== true)
      );
      //set hoan thanh task
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //truy van du lieu voi id cua user va sap xep theo projectId
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "EQDzlniTwHc9sEzeWbaN")
      .orderBy("projectId")
      .get()
      .then((snapshot) => {
        //lay tat ca project trong db
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
        //neu khong co project nao trung thi se tao project mac dinh
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
