# p5.SoundFile
音声の再生、停止、音量を変更などができるオブジェクトを返すコンストラクタ

## p5.SoundFileの使い方
以下のように`new p5.SoundFile()`に、利用する音声ファイルのパスを指定すれば、サウンドオブジェクトを取得できる。

```javascript
const sound = new p5.SoundFile('sample.mp3');

/**
 * 読み込みが完了していないため動かない
 */
sound.play();
```

上記は音声ファイルの読み込み完了を待たずに`sound.play()`を実行しているので音声は流れない。

以下のように第2引数にコールバックを指定すれば、読み込み成功後に指定した処理が実行されるため再生ができる。

```javascript
/**
 * 第2引数に読み込みが成功した時のコールバックを指定できる
 */
const sound = new p5.SoundFile('sample.mp3', onLoad);

function onLoad() {
  sound.play();
}
```

または、以下のように`preload()`や`loadSound()`を利用して、読み込み完了後の処理を実行することもできる。

**./sound.js**

```javascript
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
```

## 音量調整の注意点
公式ドキュメントには、音量を変更するためには[setVolume()](https://p5js.org/reference/#/p5.SoundFile/setVolume)を利用すると記載されているが、この方法だと動かない。

```javascript
const sound = new p5.SoundFile('sample.mp3', onLoad);

function onLoad() {
  // エラーは発生しないが音量は下がらない
  sound.setVolume(0.1);
  sound.play();
}
```

音量を調整するには`play()`の第３引数に調整値を指定する。

```javascript
const sound = new p5.SoundFile('sample.mp3', onLoad);

function onLoad() {
  sound.play(0, 0, 0.1);
}
```