import { Card } from "antd";
import { CalendarOutlined, CompassOutlined } from "@ant-design/icons";
import styles from "./TaskCard.module.css";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import { Task } from "../../types/TaskInterfaces";

const { Meta } = Card;

function EventCard({
  id,
  name,
  place,
  date,
  image,
  peopleGoing,
  myEvent,
}: Task) {
  const fullDate = dayjs(date).format("DD.MM.YYYY");

  const navigate = useNavigate();

  return (
    <>
      <Card
        className={styles["event_card"]}
        onClick={() => navigate(`${id}`)}
        cover={<img alt="example" src={image} />}
        actions={[]}
      >
        <Meta
          title={name}
          description={
            <div>
              <h4>
                <CompassOutlined /> {place}
              </h4>
              <h4>
                <CalendarOutlined /> {fullDate}
              </h4>
            </div>
          }
        />
      </Card>
    </>
  );
}

export default EventCard;
