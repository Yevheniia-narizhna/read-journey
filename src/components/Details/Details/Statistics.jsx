import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import s from "./Statistics.module.css";

const Statistics = ({ totalPages, currentPage }) => {
  const isValidTotalPages =
    typeof totalPages === "number" && !isNaN(totalPages) && totalPages > 0;
  const isValidCurrentPage =
    typeof currentPage === "number" && !isNaN(currentPage) && currentPage >= 0;

  let percentageRead;
  if (isValidTotalPages && isValidCurrentPage) {
    percentageRead = (currentPage / totalPages) * 100;
  } else {
    percentageRead = 0;
  }

  return (
    <div>
      <p className={s.statText}>
        Each page, each chapter is a new round of knowledge, a new step towards
        understanding. By rewriting statistics, we create our own reading
        history.
      </p>
      <div className={s.statCont}>
        <div className={s.statRound}>
          <CircularProgressbar
            value={isValidTotalPages && isValidCurrentPage ? percentageRead : 0}
            text={
              isValidTotalPages && isValidCurrentPage
                ? `${Math.round(percentageRead)}%`
                : "N/A"
            }
            styles={buildStyles({
              pathColor:
                isValidTotalPages &&
                isValidCurrentPage &&
                percentageRead === 100
                  ? "#30B94D"
                  : "rgba(48, 185, 77, 1)",
              textColor: "#F9F9F9",
              trailColor: "#1F1F1F",
            })}
          />
          <div
            style={{
              textAlign: "center",
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className={s.squareFlex}>
              <div className={s.square}></div>
              <p className={s.squarePerc}>
                {isValidTotalPages && isValidCurrentPage
                  ? `${percentageRead.toFixed(2)}%`
                  : "N/A"}
              </p>
            </div>
            <p className={s.squareRead}>
              {isValidTotalPages && isValidCurrentPage
                ? `${currentPage} read`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
