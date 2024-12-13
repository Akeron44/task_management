import { TaskStats } from "../../types/StatsInterface";
import styles from "./Statistic.module.css";

interface Props {
  stats: TaskStats;
}
function Statistic({ stats }: Props) {
  return (
    <div className={styles.statsSection}>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>Total Tasks</div>
        <div className={styles.statValue}>{stats?.total}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>In Progress</div>
        <div className={styles.statValue}>{stats?.byStatus.IN_PROGRESS}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>Completed</div>
        <div className={styles.statValue}>{stats?.byStatus.COMPLETED}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>Pending</div>
        <div className={styles.statValue}>{stats?.byStatus.PENDING}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>Low Priority</div>
        <div className={styles.statValue}>{stats?.byPriority.LOW}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>Medium Priority</div>
        <div className={styles.statValue}>{stats?.byPriority.MEDIUM}</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statTitle}>High Priority</div>
        <div className={styles.statValue}>{stats?.byPriority.HIGH}</div>
      </div>
    </div>
  );
}

export default Statistic;
