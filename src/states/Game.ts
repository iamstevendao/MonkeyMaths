// Main game state

import * as Phaser from 'phaser-ce';
import { Monkey } from '../sprites/monkey';
import { Obstacle } from '../sprites/Obstacle';
import { Answer } from '../utils/Answer';

/**
 * @summary Main game state
 */
export class GameState extends Phaser.State {

  /**
   * @summary Monkey
   */
  public monkey: Monkey;
  /**
   * @summary Obstacles list, generated when game created,
   * with the position getting updated during the game
   */
  public obstacles: Obstacle[] = [];
  /**
   * @summary Store the next obstacle index to keep track
   */
  private nextObstacleIndex: number = 0;
  /**
   * @summary Answer from user
   */
  private answer: Answer;

  /**
   * @summary Initialize game
   */
  public init(): void {
    this.game.world.setBounds(0, 0, 8000, this.game.height);
  }

  /**
   * @summary Create game
   */
  public create(): void {
    // Add banner (will move or remove it later)
    const bannerText = 'Monkey Maths by Starmaths';
    const banner = this.add.text(500, this.game.height - 80, bannerText, null);
    banner.font = 'Bangers';
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = '#ff0000';
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

    // Setup monkey
    this.monkey = new Monkey(this, 100, this.world.centerY, 'monkey');
    this.game.add.existing(this.monkey);

    // Setup answer
    this.answer = new Answer(this.game, this.game.width / 2, this.world.centerY);
    this.game.add.existing(this.answer);

    // Initialize obstacles list, hard-coded to be 10 right now
    for (let i = 1; i < 10; i += 1) {
      const obstacle = new Obstacle(this.game, 800 * i, this.world.centerY);
      this.game.add.existing(obstacle);
      this.obstacles.push(obstacle);
    }

    // Handle key press event
    this.game.input.keyboard.onDownCallback = (e) => {
      this.handleCursors(e);
    };

    // Set camera to follow the monkey
    this.game.camera.follow(this.monkey);
    this.game.camera.lerp.x = 0.1;
    this.game.camera.deadzone = new Phaser.Rectangle(50, 100, 50, 400);
  }

  /**
   * @summary Handle game events
   */
  public update(): void {
    this.game.physics.arcade.collide(this.monkey, this.obstacles, this.onCollide, null, this);
  }

  /**
   * @summary Handle collision event (of monkey and obstacles)
   * @param obj1
   * @param obj2
   */
  private onCollide(obj1: object, obj2: any): void {
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

  /**
   * @summary Fires when user answers correctly an obstacle
   */
  private onCorrect(): void {
    this.nextObstacleIndex += 1;
    if (this.nextObstacleIndex >= this.obstacles.length - 1) {
      // End game
      return;
    }
    this.monkey.overcome();
    this.obstacles[this.nextObstacleIndex].setPath(this.monkey.path);
    setTimeout(() => this.answer.delete(), 1000);
  }

  /**
   * @summary Verify the answer of user
   */
  private verifyAnswer() {
    if (this.obstacles[this.nextObstacleIndex].isCorrect(this.answer.getText())) {
      this.onCorrect();
    }
  }

  /**
   * @summary Handle keypress event
   * @param e key press
   */
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
