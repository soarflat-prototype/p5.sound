let sound;
let amplitude;
const maxAmp = 1;
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
  createCanvas(100, 100);
  amplitude = new p5.Amplitude();

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
  background(0);

  /**
   * 線の色を指定
   */
  fill(255);

  /**
   * 振幅（音量）を取得する
   *
   * NOTE:
   *   同じ音声でもsound.play()で音量を変更すれば、amplitude.getLevel()で取得する値も異なる
   *   sound.play(0, 0, 0.5)にすれば、取得する値はsound.play(0, 0, 1)の半分になる
   *   音量によって取得する値が異なると、描画の調整がかなり大変になるので
   *   どの音量でも同じ値を取得できるように、取得した値に(maxAmp / amp)を乗算している
   *   maxAmpはplay()で指定できる最大音量、これは1で固定、ampはplay()に指定する音量
   *
   *   例えばampを0.5にすると、振幅（音量）の値を取得する計算は以下の通り
   *   const level = amplitude.getLevel() * (1 / 0.5);
   *
   *   上記のようにすればどの音量でもamplitude.getLevel()で同じ値が取得できる
   */
  const level = amplitude.getLevel() * (maxAmp / amp);

  /**
   * 振幅（音量）をスケーリングする
   */
  const size = map(level, 0, 1, 0, 200) * pow(1.1, 2);

  /**
   * 円の描画
   */
  ellipse(width / 2, height / 2, size, size);
}
