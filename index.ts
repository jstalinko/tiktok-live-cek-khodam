import { WebcastPushConnection } from "tiktok-live-connector";
import { kodamList } from "./utils/kodamlist";
import { randomString } from "./utils/common";
import { save, readAll, readByUsername } from "./utils/model";
import chalk from "chalk";

// tap layar 15x isi kodam random
// gift 1 coin = 1 kodam

let tiktokUsername = "hadi_emperor";



// Create a new wrapper object and pass the username
let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

// Connect to the chat (await can be used as well)
tiktokLiveConnection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });

// Define the events that you want to handle
// In this case we listen to chat messages (comments)
tiktokLiveConnection.on("chat", async (data) => {
  if (data.comment.match(/^cek/)) {
    var khodam = randomString(kodamList);
    var checkExist = await readByUsername(data.uniqueId, data.comment);
    var nama = data.comment.replace("cek ", "");
    console.log(
      "--------------------------------------------------------------------------------------"
    );
    if (checkExist == undefined) {
      save([data.uniqueId, nama, khodam]);
      console.log(
        chalk.cyan("@" + data.uniqueId) +
          " | NAMA : " +
          chalk.green(nama.toString()) +
          "| KHODAM :: " +
          chalk.yellow(khodam)
      );
    } else {
      console.log(
        chalk.cyan("@" + checkExist.username) +
          " | NAMA : " +
          chalk.green(checkExist.comment.toString()) +
          "| KHODAM :: " +
          chalk.yellow(checkExist.kodam)
      );
    }
    console.log(
      "--------------------------------------------------------------------------------------"
    );
  } else {
    console.log(
      chalk.cyan("@" + data.uniqueId) +
        " : \"" +
        chalk.green(data.comment.toString() + "\"")
    );
  }
});

// And here we receive gifts sent to the streamer
tiktokLiveConnection.on("gift", (data) => {
  console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
});

tiktokLiveConnection.on("like", (data) => {
  //  console.log(`${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
  console.log(
    `${chalk.cyan("@" + data.uniqueId)} sent ${chalk.red(
      data.likeCount
    )} likes | total likes: ${chalk.green(data.totalLikeCount)}`
  );
});
