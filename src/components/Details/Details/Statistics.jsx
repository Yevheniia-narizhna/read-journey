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
            percentageRead === 100 ? "#1F1F1F" : `rgba(48, 185, 77, 1)`, // зелений колір
          textColor: "#F9F9F9",
          trailColor: "#1F1F1F", // колір фону
        })}
      />
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <p>{`${percentageRead.toFixed(2)}%`}</p>
        <p>{`${currentPage} read`}</p>
      </div>
    </div>
  );
};

export default Statistics;
