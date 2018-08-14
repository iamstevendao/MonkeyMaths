/* globals __DEV__ */
import * as Phaser from 'phaser-ce';
import { Monkey } from '../sprites/monkey';
import { Obstacle } from '../sprites/Obstacle';

declare var __DEV__: boolean;

export class GameState extends Phaser.State {

  public monkey: Monkey;
  public obstacles: Obstacle[] = [];
  private nextObstacleIndex: number = 0;
  private answer: string;

  public init(): void {
    this.game.world.setBounds(0, 0, 10000, this.game.height);
  }
  public preload(): void { }

  public create(): void {
    const bannerText = 'Monkey Maths by Starmaths';
    const banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, null);
    banner.font = 'Bangers';
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

    this.monkey = new Monkey(this, this.world.centerX, this.world.centerY, 'monkey');
    for (let i = 1; i < 10; i += 1) {
      const obstacle = new Obstacle(this.game, this.world.centerX + 800 * i, this.world.centerY);
      this.game.add.existing(obstacle);
      this.obstacles.push(obstacle);
    }

    this.game.add.existing(this.monkey);
    // arrow keys pressed
    this.game.input.keyboard.onDownCallback = (e) => {
      this.handleCursors(e);
    };

    this.game.camera.follow(this.monkey, Phaser.Camera.FOLLOW_LOCKON, 0.1);
  }

  public update(): void {
    this.game.physics.arcade.collide(this.monkey, this.obstacles, this.onCollide, null, this);
  }

  public render(): void {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.monkey, 32, 32);
    }
  }

  private onCollide(obj1: object, obj2: any) {
    this.game.camera.shake(0.01, 500);
    this.monkey.hit();
    this.nextObstacleIndex += 1;
    if (this.nextObstacleIndex >= this.obstacles.length - 1) {
      // End game
      return;
    }
    this.obstacles[this.nextObstacleIndex].setPath(this.monkey.path);
    obj2.destroy();
    this.answer = '';
  }

  private onCorrect() {
    this.nextObstacleIndex += 1;
    if (this.nextObstacleIndex >= this.obstacles.length - 1) {
      // End game
      return;
    }
    this.monkey.overcome();
    this.obstacles[this.nextObstacleIndex].setPath(this.monkey.path);
    this.answer = '';
  }

  private verifyAnswer() {
    if (this.answer === this.obstacles[this.nextObstacleIndex].getAnswer()) {
      this.onCorrect();
    }
  }

  private handleCursors(e): void {
    if (e.keyCode === 8) {
      // Backspace
      this.answer = '';
      return;
    }
    // Key 57: 9
    // Key 48: 0
    if (e.keyCode > 57 || e.keyCode < 48) {
      return;
    }
    this.answer += (e.keyCode - 48);
    this.verifyAnswer();
  }
}
