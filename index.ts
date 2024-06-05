import { WebcastPushConnection } from "tiktok-live-connector";
import { kodamList,specialKodamList } from "./utils/kodamlist";
import { randomString } from "./utils/common";
import { save, readAll, readByUsername } from "./utils/model";
import { checkNama } from "./gemini";
import chalk from "chalk";

// tap layar 15x isi kodam random
// gift 1 coin = 1 kodam

let tiktokUsername = "hasanahilmu82";



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
  if (data.comment.match(/^cek|^Cek/)) {
    var khodam = randomString(kodamList);
    var checkExist = await readByUsername(data.uniqueId, data.comment);
    var nama = data.comment.replace("cek ", "");
        nama = nama.replace("Cek ", "");
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
  }else if(data.comment.match(/^arti|^Arti/)){ 
    var nama = data.comment.replace("arti ", "");
        nama = nama.replace("Arti ", "");
    console.log("---------[ ARTI NAMA "+nama+" ]---------");
     await checkNama(nama);
    console.log("");
  }else {
    console.log(
      chalk.cyan("@" + data.uniqueId) +
        " : \"" +
        chalk.green(data.comment.toString() + "\"")
    );
  }
});

// And here we receive gifts sent to the streamer
tiktokLiveConnection.on("gift", (data) => {
  console.log("");
  var khodam = randomString(specialKodamList);
  if (data.giftType === 1 && !data.repeatEnd) {
    // Streak in progress => show only temporary
    console.log(`[!!] ${data.uniqueId} is sending gift ${data.giftName} x${data.repeatCount}`);
} else {
    // Streak ended or non-streakable gift => process the gift with final repeat_count
    console.log(`[!!] ${data.uniqueId} has sent gift ${data.giftName} x${data.repeatCount}`);
  }
  console.log(chalk.red("--------------[ THANKS FOR THE GIFT ]--------------"));
  console.log(chalk.cyan(`${data.uniqueId} MENDAPAT KHODAM ${khodam} !!!!!!!!!!!`));
  console.log("---------------------------------------------------");
  console.log("")

});

tiktokLiveConnection.on("like", (data) => {
  //  console.log(`${data.uniqueId} sent ${data.likeCount} likes, total likes: ${data.totalLikeCount}`);
  console.log(
    `${chalk.cyan("@" + data.uniqueId)} sent ${chalk.red(
      data.likeCount
    )} likes | total likes: ${chalk.green(data.totalLikeCount)}`
  );
});
