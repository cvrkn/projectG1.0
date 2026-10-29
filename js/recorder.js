let capturer = null;
let isCapturing = false;
let captureFrameCount = 0;
const exportCanvas = document.createElement('canvas');
exportCanvas.width = 1080;
exportCanvas.height = 2340;
const eCtx = exportCanvas.getContext('2d');

function toggleCapture() {
  const btn = $('#recBtn');
  if (!isCapturing) {
    capturer = new CCapture({
      format: 'webm',
      framerate: 30,
      quality: 95,
      verbose: false
    });
    capturer.start();
    isCapturing = true;
    captureFrameCount = 0;
    if (btn) {
      btn.textContent = '⏹ Stop & Save';
      btn.classList.add('on');
    }
    go(1);
  } else {
    isCapturing = false;
    if (btn) {
      btn.textContent = '⏺ Rec Video';
      btn.classList.remove('on');
    }
    capturer.stop();
    capturer.save(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'fake-guru-animation.webm';
      a.click();
    });
  }
}

const originalRaf = window.requestAnimationFrame;
window.requestAnimationFrame = function(callback) {
  return originalRaf(time => {
    if (isCapturing) {
      captureFrameCount++;
      if (captureFrameCount === 120) go(2);
      else if (captureFrameCount === 270) go(3);
      else if (captureFrameCount === 420) go(4);
      else if (captureFrameCount === 540) go(5);
      else if (captureFrameCount === 660) go(6);
      else if (captureFrameCount === 840) toggleCapture();

      const svgString = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const blobURL = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        eCtx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
        eCtx.drawImage(img, 0, 0, exportCanvas.width, exportCanvas.height);
        URL.revokeObjectURL(blobURL);
        capturer.capture(exportCanvas);
        callback(time);
      };
      img.src = blobURL;
    } else {
      callback(time);
    }
  });
};

