console.clear();

var BATCH_SIZE = 1e4;
var BATCH_LABEL = "1 batch";
var BATCH_TIME_LIMIT = 1; // 1ms (could be larger!)
var TASK_TARGET = 1e6;
var taskIndex = 0;
var batchCount = 0;
var done = false;
var bar;
var colors = window.colors;

var game = new Phaser.Game({
  // antialias:               true,
  // backgroundColor:         0x000000,
  // disableVisibilityChange: false,
  // enableDebug:             true,
  // height:                  600,
  renderer: Phaser.CANVAS,
  // resolution:              1,
  // scaleMode:               Phaser.ScaleManager.NO_SCALE,
  // transparent:             false,
  // width:                   800,
  state: {
    create: function() {
      bar = this.add.image(400, 50, this.add.bitmapData(1, 1).fill(255, 255, 255));
      bar.anchor.set(0.5);
      bar.scale.set(0, 30);
    },

    update: function() {
      if (!done) {
        this.doBatch();
      }
      if (done) {
        bar.kill();
      } else {
        var progress = this.getProgress();
        bar.scale.x = 400 * progress;
        bar.tint = Phaser.Color.linear(0xff4136, 0x2ecc40, progress) & 0xffffff;
      }
    },

    render: function() {
      var debug = this.game.debug;
      debug.object(
        {
          value: taskIndex,
          progress: this.getProgress(),
          batches: batchCount,
          done: done
        }, 20, 20,
        {
          label: "task",
          color: "auto"
        }
      );
      debug.phaser(10, 580);
    },

    doBatch: function() {
      var started = Date.now();
      console.time(BATCH_LABEL);
      while (!done && (Date.now() - started) < BATCH_TIME_LIMIT) {
        this.doChunk();
        done = this.getProgress() >= 1;
      }
      console.timeEnd(BATCH_LABEL);
      batchCount += 1;
    },

    doChunk: function() {
      taskIndex++;
    },

    getProgress: function() {
      return taskIndex / TASK_TARGET;
    }
  }
});
