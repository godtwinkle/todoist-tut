import { collatedTasks } from "../constants";

//tim project co id la ...
export const getTitle = (projects, projectId) =>
  projects.find((project) => project.projectId === projectId);

//tim project co key la ...
export const getCollatedTitle = (projects, key) =>
  projects.find((project) => project.key === key);

//tim kiem xem co phai la 1 trong cac project co san hay khong
export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);

//tao ngau nhien id cho project
export const generatePushId = (() => {
  const PUSH_CHARS =
    "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

  const lastRandChars = [];

  return function () {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join("");

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();
