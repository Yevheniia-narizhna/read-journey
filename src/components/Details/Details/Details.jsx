import { useEffect, useState } from "react";
import Diary from "./Diary";
import Statistics from "./Statistics";
import s from "./Details.module.css";
import ModalDone from "../../ModalDone/ModalDone";

const Details = ({ book }) => {
  const [activeTab, setActiveTab] = useState("diary");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const totalPages = book.totalPages; // Загальна кількість сторінок книги
  const currentPage = book.progress[book.progress.length - 1]?.finishPage || 0;

  const hasProgress = book.progress.length > 0;

  useEffect(() => {
    if (currentPage === totalPages && totalPages !== 0) {
      setShowSuccessModal(true);
    }
  }, [currentPage, totalPages]);

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const validEntries = book.progress.filter(
    (entry) =>
      typeof entry?.finishPage === "number" &&
      typeof entry?.startPage === "number" &&
      typeof entry?.speed === "number" &&
      !isNaN(entry.finishPage) &&
      !isNaN(entry.startPage) &&
      !isNaN(entry.speed)
  );

  if (!hasProgress) {
    return (
      <div className={s.detailsCont}>
        <h4 className={s.detailsTitle}>Progress</h4>
        <div className={s.details}>
          <p className={s.detailsText}>
            Here you will see when and how much you read. To record, click on
            the red button above.
          </p>
          <div className={s.imgCont}>
            <picture>
              <source
                srcSet="/img/star-mob-x1.png 1x, /img/star-mob-x2.png 2x"
                media="(max-width: 767px)"
              />
              <source
                srcSet="/img/star-des-x1.png 1x, /img/star-des-x2.png 2x"
                media="(min-width: 768px)"
              />
              <img src="/img/star-mob-x1.png" alt="Progress" />
            </picture>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.detailsMainCont}>
      <div className={s.detailsMainBtns}>
        <h2 className={s.detailsTitle}>
          {activeTab === "diary" ? "Diary" : "Statistics"}
        </h2>
        <div className={s.detailsBtns}>
          <button onClick={() => setActiveTab("diary")} className={s.btnDetail}>
            <svg
              className={`${s.svgDetail} ${
                activeTab === "statistics" ? s.inactiveIcon : ""
              }`}
            >
              <use href="/symbol-defs.svg#icon-hourglass-01" />
            </svg>
          </button>
          <button
            onClick={() => setActiveTab("statistics")}
            className={s.btnDetail}
          >
            <svg
              className={`${s.svgDetail} ${
                activeTab === "diary" ? s.inactiveIcon : ""
              }`}
            >
              <use href="/symbol-defs.svg#icon-pie-chart-02" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        {activeTab === "diary" && (
          <Diary
            entries={validEntries}
            bookId={book._id}
            totalPages={totalPages}
          />
        )}
        {activeTab === "statistics" && (
          <Statistics totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>
      {showSuccessModal && <ModalDone onClose={closeSuccessModal} />}
    </div>
  );
};

export default Details;
