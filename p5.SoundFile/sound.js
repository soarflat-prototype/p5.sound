let sound;

/**
 * 音声ファイルをプリロードする
 * ロードが完了すると自動でsetup()が実行される
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
  /**
   * ロードした音声を再生する
   *
   * NOTE:
   *   音量を指定するsetVolume()が動かないため、play()の第３引数に音量を指定する
   *   play()で扱える引数は現行のドキュメントと異なり、以下が最新（だと思う）
   *   p5.SoundFile.prototype.play = function (startTime, rate, amp, cueStart, duration)
   */
  sound.play(0, 0, 0.5);
}