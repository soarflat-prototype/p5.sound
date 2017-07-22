let sound;
let fft;
const amp = 0.1;

/**
 * 音声をファイルをプリロードする
 * ロードが完了すると自動でsetupが実行される
 */
function preload() {
  /**
   * SoundFileオブジェクトを取得する
   */
  sound = loadSound('sample.mp3');
}

/**
 * プログラム実行時に1回だけ実行される関数
 * 画面サイズや背景色などを定義したり、プログラム実行時に画像やフォントなどの
 * メディアを読み込んだりするために使用される
 * 今回はpreload()があるので、プリロード完了後に実行される
 */
function setup() {
  createCanvas(600, 400);
  noFill();

  fft = new p5.FFT();

  /**
   * ロードした音声を再生する
   *
   * NOTE:
   *   音量を指定するsetVolume()が動かないため、play()の第３引数に音量を指定する
   *   play()で扱える引数は現行のドキュメントと異なり、以下が最新（だと思う）
   *   p5.SoundFile.prototype.play = function (startTime, rate, amp, cueStart, duration)
   */
  sound.play(0, 0, amp);
}

/**
 * setup()実行後に実行される関数
 * noLoop()が呼ばれるまで、ループ実行される
 */
function draw() {
  /**
   * 指定した背景色で描画
   */
  background(200);

  const spectrum = fft.analyze();

  beginShape();

  for (i = 0; i < spectrum.length; i++) {
    const y = map(spectrum[i], 0, 255, height, 0);
    
    vertex(i, y);
  }

  endShape();
}
