import cron from "node-cron";
import { updateFailedTasks } from "../controller/util.js";

cron.schedule("1 0 * * *", async () => {
  try {
    await updateFailedTasks();
    console.log("Daily Cron job executed");
  } catch (error) {
    console.log("Daily Cron job failed", error);
  }
});
