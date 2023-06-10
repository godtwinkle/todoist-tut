import React from "react";
import moment from "moment";
import { FaSun, FaRegPaperPlane, FaRocket, FaPlane } from "react-icons/fa";
import PropTypes from "prop-types";

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                setTaskDate("");
              }
            }}
            data-testid="task-no-date"
            //giup trinh doc co the doc cho nguoi mu
            aria-label="Select no date as the task date"
            tabIndex={0}
            role="button"
          >
            <span>
              <FaPlane />
            </span>
            <span>Không thời hạn</span>
          </div>
        </li>
        <li data-testid="task-date-today">
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format("DD/MM/YYYY"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                setTaskDate(moment().format("DD/MM/YYYY"));
              }
            }}
            data-testid="task-date-today"
            tabIndex={0}
            //giup trinh doc co the doc cho nguoi mu
            aria-label="Select today as the task date"
            role="button"
          >
            <span>
              <FaRocket />
            </span>
            <span>Hôm nay</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
              }
            }}
            data-testid="task-date-tomorrow"
            role="button"
            tabIndex={0}
            //giup trinh doc co the doc cho nguoi mu
            aria-label="Select tomorrow as the task date"
          >
            <span>
              <FaSun />
            </span>
            <span>Ngày mai</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
              }
            }}
            data-testid="task-date-next-week"
            //giup trinh doc co the doc cho nguoi mu
            aria-label="Select next week as the task date"
            tabIndex={0}
            role="button"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Tuần tới</span>
          </div>
        </li>
      </ul>
    </div>
  );

TaskDate.propTypes = {
  setTaskDate: PropTypes.func.isRequired,
  showTaskDate: PropTypes.bool.isRequired,
  setShowTaskDate: PropTypes.func.isRequired,
};
