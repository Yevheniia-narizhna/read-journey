import { useState } from "react";
import Diary from "./Diary";
import Statistics from "./Statistics";
import s from "./Details.module.css";

const Details = ({ book }) => {
  const [activeTab, setActiveTab] = useState("diary");
  const totalPages = book.totalPages; // Загальна кількість сторінок книги
  const currentPage = book.progress[book.progress.length - 1]?.finishPage || 0;
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
        {activeTab === "diary" && (
          <Diary
            entries={book.progress}
            bookId={book._id}
            totalPages={totalPages}
          />
        )}
        {activeTab === "statistics" && (
          <Statistics totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
};

export default Details;
