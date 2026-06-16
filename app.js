function cargarCanal(url) {
  const video = document.getElementById("video");

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
  } else {
    video.src = url;
  }
}
