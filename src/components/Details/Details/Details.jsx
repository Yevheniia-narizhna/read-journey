import { useState } from "react";
import Diary from "./Diary";
import Statistics from "./Statistics";
import s from "./Details.module.css";

const Details = () => {
  const [activeTab, setActiveTab] = useState("diary");

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("diary")} className={s.btnDetail}>
          <svg className={s.svgDetail}>
            <use href="/src/assets/symbol-defs.svg#icon-hourglass-01" />
          </svg>
        </button>
        <button
          onClick={() => setActiveTab("statistics")}
          className={s.btnDetail}
        >
          <svg className={s.svgDetail}>
            <use href="/src/assets/symbol-defs.svg#icon-pie-chart-02" />
          </svg>
        </button>
      </div>

      <div>
        {activeTab === "diary" && <Diary />}
        {activeTab === "statistics" && <Statistics />}
      </div>
    </div>
  );
};

export default Details;
