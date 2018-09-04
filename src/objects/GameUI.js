class GameUI {

  constructor(game){
      this.game = game;


      initUI();
  }

  initUI(){


  this.INMAIN = "lol";

  console.log(this.INMAIN);
  /*  var style = { font: "65px Arial", fill: "#ffffff", align: "center" };

  var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "-TILE NAME-\nTILE ID\nNewline", style);

  text.anchor.set(0.5);*/
  }
}
export default GameUI;
