import ytdl from "ytdl-core"
import fs from "fs"
import { error } from "console"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("realizando o downlaod do video:", videoId)
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 60) {
          throw new Error("A duração do vídeo é maior que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log("download do video finalizado")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Ocorreu um erro ao fazer o dowload do video. Detalhes:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
