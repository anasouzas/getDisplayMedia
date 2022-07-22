const permission = navigator.mediaDevices.getDisplayMedia;
const takeScreenShot = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" },
  });
  const track = stream.getVideoTracks()[0];
  const image = new ImageCapture(track);
  const bitmap = await image.grabFrame();

  track.stop();

  const canvas = document.getElementById("screenshot");

  canvas.width = bitmap.width/2;
  canvas.height = bitmap.height/2;

  const context = canvas.getContext("2d");

  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const img = canvas.toDataURL();
  const res = await fetch(img);
  const buff = await res.arrayBuffer();
  const file = [
    new File([buff], `photo_${new Date()}.jpg`, {
      type: "image/jpeg",
    }),
  ];

  return file;
};

$("#btn").click(function () {
  permission ? takeScreenShot() : {};
  $("#print-modal").modal("show");
});
