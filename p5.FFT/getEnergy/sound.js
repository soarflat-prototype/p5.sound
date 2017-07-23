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
  createCanvas(windowWidth, 400);
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
  stroke(0);

  /**
   * 再生中の音声のスペクトラム（配列）を取得
   * 配列の長さはFFT bins（new p5.FFT()の第2引数に指定した数）と同じ
   * デフォルトは1024なので、1024個の配列が返ってくる
   * 配列内スペクトラムの値は0~255のため、必要に応じてスケーリングする
   */
  const spectrum = fft.analyze();

  for (i = 0; i < spectrum.length; i++) {
    /**
     * 単純にspectrum[i]の値を描画すると、描画に抑揚がでない（ようはつまらない）
     * そのため、getEnergy（）で特定の周波数の振幅の平均値を取得し、その値はspectrum[i]から減算する
     * 今回は1~20000Hzの平均振幅値を取得し、減算に利用している
     * pow(1.1, 3)はチューニング値なので、自由に調整可能
     */
    const level = (spectrum[i] - fft.getEnergy(1, 20000)) * pow(1.1, 3);
    const x = map(i, 0, 1024, 0, windowWidth);
    const y = map(level, 0, 255, height, 0);

    line(x, height, x, y);
  }
}
