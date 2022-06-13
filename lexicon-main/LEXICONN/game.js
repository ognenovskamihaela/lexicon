import preload from "./src/menu";

const game=new Phaser.game(800, 600, Phaser.CANVAS, "");

game.state.add("menu", new preload(game));


game.state.start("menu");