import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import s from "./Statistics.module.css";

const Statistics = ({ totalPages, currentPage }) => {
  // Розраховуємо відсоток прочитаної книги
  const percentageRead = (currentPage / totalPages) * 100;

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
            value={percentageRead}
            text={`${Math.round(percentageRead)}%`}
            styles={buildStyles({
              pathColor:
                percentageRead === 100 ? "#30B94D" : "rgba(48, 185, 77, 1)", // зелений колір
              textColor: "#F9F9F9",
              trailColor: "#1F1F1F", // колір фону
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
              <p className={s.squarePerc}>{`${percentageRead.toFixed(2)}%`}</p>
            </div>
            <p className={s.squareRead}>{`${currentPage} read`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
