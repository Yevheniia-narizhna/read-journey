import { useState } from "react";
import Diary from "./Diary";
import Statistics from "./Statistics";
import s from "./Details.module.css";

const Details = ({ book }) => {
  const [activeTab, setActiveTab] = useState("diary");
  const totalPages = book.totalPages; // Загальна кількість сторінок книги
  const currentPage = book.progress[book.progress.length - 1]?.finishPage || 0;

  const hasProgress = book.progress.length > 0;

  if (!hasProgress) {
    return (
      <div>
        <div>
          <picture>
            <source
              srcSet="/src/img/star-mob-x1.png 1x, /src/img/star-mob-x2.png 2x"
              media="(max-width: 767px)"
            />
            <source
              srcSet="/src/img/star-des-x1.png.png 1x, /src/img/star-des-x2.png 2x"
              media="(min-width: 768px)"
            />
            <img src="/src/img/star-mob-x1.png.png" alt="Progress" />
          </picture>
        </div>
        <p>
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
      </div>
    );
  }

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
