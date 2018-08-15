/* globals __DEV__ */
import * as Phaser from 'phaser-ce';
import { Monkey } from '../sprites/monkey';
import { Obstacle } from '../sprites/Obstacle';
import { Answer } from '../utils/Answer';

export class GameState extends Phaser.State {

  public monkey: Monkey;
  public obstacles: Obstacle[] = [];
  private nextObstacleIndex: number = 0;
  private answer: Answer;

  public init(): void {
    this.game.world.setBounds(0, 0, 8000, this.game.height);
  }
  public preload(): void { }

  public create(): void {
    const bannerText = 'Monkey Maths by Starmaths';
    const banner = this.add.text(500, this.game.height - 80, bannerText, null);
    banner.font = 'Bangers';
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#ff0000';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

    this.monkey = new Monkey(this, 100, this.world.centerY, 'monkey');
    this.answer = new Answer(this.game, this.game.width / 2, this.world.centerY);

    for (let i = 1; i < 10; i += 1) {
      const obstacle = new Obstacle(this.game, 800 * i, this.world.centerY);
      this.game.add.existing(obstacle);
      this.obstacles.push(obstacle);
    }

    this.game.add.existing(this.answer);
    this.game.add.existing(this.monkey);
    // arrow keys pressed
    this.game.input.keyboard.onDownCallback = (e) => {
      this.handleCursors(e);
    };

    this.game.camera.follow(this.monkey);
    this.game.camera.lerp.x = 0.1;
    this.game.camera.deadzone = new Phaser.Rectangle(50, 100, 50, 400);

    const zone = this.game.camera.deadzone;
    this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
    this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
  }

  public update(): void {
    this.game.physics.arcade.collide(this.monkey, this.obstacles, this.onCollide, null, this);
  }

  public render(): void {
  }

  private onCollide(obj1: object, obj2: any) {
    this.game.camera.shake(0.01, 500);
    this.monkey.hit();
    this.answer.x = this.monkey.x + 50;
    this.nextObstacleIndex += 1;
    obj2.destroy();
    if (this.nextObstacleIndex >= this.obstacles.length - 1) {
      // End game
      return;
    }
    this.obstacles[this.nextObstacleIndex].setPath(this.monkey.path);
    this.answer.delete();
  }

  private onCorrect() {
    this.nextObstacleIndex += 1;
    if (this.nextObstacleIndex >= this.obstacles.length - 1) {
      // End game
      return;
    }
    this.monkey.overcome();
    this.obstacles[this.nextObstacleIndex].setPath(this.monkey.path);
    setTimeout(() => this.answer.delete(), 1000);
  }

  private verifyAnswer() {
    if (this.answer.getText() === this.obstacles[this.nextObstacleIndex].getResult()) {
      this.onCorrect();
    }
  }

  private handleCursors(e): void {
    if (e.keyCode === 8) {
      // Backspace
      this.answer.delete();
      return;
    }
    // Key 57: 9
    // Key 48: 0
    if (e.keyCode > 57 || e.keyCode < 48) {
      return;
    }
    this.answer.concat((e.keyCode - 48).toString());
    this.verifyAnswer();
  }
}
