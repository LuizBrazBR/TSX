import React, { useEffect, useRef, useState } from "react";

// Adicione funcionalidades ao player de vídeo:

// 1 - Use um estado reativo para verificar se o vídeo está tocando ou não.
// 2 - Função para avançar o vídeo em +2s.
// 3 - Função para alterar o playbackRate do vídeo.
// 4 - Função para entrar/sair do modo pictureInPicture.
// 5 - Função para alternar o som (mudo/não mudo) do vídeo.

import videomp4 from "./video.mp4";

function App() {
  const video = useRef<HTMLVideoElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    video.current?.addEventListener("ended", () => {
      setPlayed(false);
    });
  }, []);

  return (
    <div>
      <div className="flex">
        <button
          onClick={() => {
            if (!played) {
              video.current?.play();
              setPlayed(true);
            } else {
              video.current?.pause();
              setPlayed(false);
            }
          }}
        >
          {played ? "Pause" : "Play"}
        </button>
        <button
          onClick={() => {
            if (video.current)
              video.current.currentTime = video.current.currentTime + 2;
          }}
        >
          +2s
        </button>
        <button
          onClick={() => {
            if (video.current) video.current.playbackRate = 1;
          }}
        >
          1x
        </button>
        <button
          onClick={() => {
            if (video.current) video.current.playbackRate = 2;
          }}
        >
          2x
        </button>
        <button
          onClick={() => {
            if (document.pictureInPictureElement)
              document.exitPictureInPicture();
            else video.current?.requestPictureInPicture();
          }}
        >
          PiP
        </button>

        <button
          onClick={() => {
            if (video.current?.muted) video.current.muted = false;
            else if (video.current && !video.current?.muted)
              video.current.muted = true;
          }}
        >
          M
        </button>
      </div>
      <div>
        <video src={videomp4} controls ref={video} />
      </div>
    </div>
  );
}

export default App;
