import Dashboard from "../../components/Dashboard/Dashboard";
import RecommendedAll from "../../components/RecommendedAll/RecommendedAll";
import s from "./RecommendedPage.module.css";

const RecommendedPage = () => {
  return (
    <div className={s.recommPage}>
      <Dashboard />
      <RecommendedAll />
    </div>
  );
};
export default RecommendedPage;
