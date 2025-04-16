import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // стилі для прогресбара

const Statistics = ({ totalPages, currentPage }) => {
  // Розраховуємо відсоток прочитаної книги
  const percentageRead = (currentPage / totalPages) * 100;

  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={percentageRead}
        text={`${Math.round(percentageRead)}%`}
        styles={buildStyles({
          pathColor:
            percentageRead === 100
              ? "#4caf50"
              : `rgba(76, 175, 80, ${percentageRead / 100})`, // зелений колір
          textColor: "#4caf50",
          trailColor: "#d6d6d6", // колір фону
        })}
      />
      <p>Progress</p>
    </div>
  );
};

export default Statistics;
