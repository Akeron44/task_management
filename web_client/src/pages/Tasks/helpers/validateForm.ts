import { z } from "zod";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import error_messages from "../../../constants/error_messages";

dayjs.extend(utc);
dayjs.extend(timezone);

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: error_messages.MIN_CHARACTERS("name", 3) })
    .max(55, error_messages.MAX_CHARACTERS("name", 55)),
  place: z
    .string()
    .trim()
    .min(3, error_messages.MIN_CHARACTERS("place", 3))
    .max(250, error_messages.MAX_CHARACTERS("place", 55)),
  description: z
    .string()
    .trim()
    .min(5, error_messages.MIN_CHARACTERS("Description", 5))
    .max(250, error_messages.MAX_CHARACTERS("Description", 250)),
  date: z
    .date({ message: error_messages.ENTITY_REQUIRED("Date") })
    .min(
      dayjs().tz("Europe/Belgrade").startOf("day").toDate(),
      error_messages.WRONG_DATE
    ),
});
