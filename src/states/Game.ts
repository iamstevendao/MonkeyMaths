// Main game state

import * as Phaser from 'phaser-ce';
import { Monkey } from '../sprites/monkey';
import { Obstacle } from '../sprites/Obstacle';
import { Answer } from '../utils/Answer';
import { Track } from '../utils/Track';

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
   * @summary Banner starmaths
   */
  private banner: object;
  /**
   * @summary Score
   */
  private score: Phaser.Text;
  /**
   * @summary Level
   */
  private level: Phaser.Text;
  /**
   * @summary Tracking
   */
  private track: Track;

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
    this.initializeObjects();
    this.initializeGame();
  }

  private initializeObjects(): void {
    this.track = new Track();
    this.initializeBanner();
    this.initializeScore();
    this.initializeLevel();

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
  }

  private initializeGame(): void {
    // Handle key press event
    this.game.input.keyboard.onDownCallback = (e) => {
      this.handleCursors(e);
    };

    // Set camera to follow the monkey
    this.game.camera.follow(this.monkey);
    this.game.camera.lerp.x = 0.1;
    this.game.camera.deadzone = new Phaser.Rectangle(50, 100, 50, 400);
  }

  private initializeBanner(): void {
    const bannerText = 'Monkey Maths by Starmaths';
    this.banner = this.add.text(this.game.width / 2, this.game.height - 80, bannerText, null);
    this.attachStyle(this.banner);
  }

  private initializeScore(): void {
    this.score = this.add.text(this.game.width / 4, 80, '', null);
    this.attachStyle(this.score);
  }

  private initializeLevel(): void {
    this.level = this.add.text(this.game.width * 3 / 4, 80, '', null);
    this.attachStyle(this.level);
  }

  private refreshTrack(): void {
    this.score.setText(`Score: ${this.track.getScore()}`);
    this.level.setText(`Level: ${this.track.getLevel()}`);
  }

  private attachStyle(obj): void {
    Object.assign(obj, {
      font: 'Press Start 2P',
      fontSize: 25,
      padding: {
        x: 20,
        y: 20,
      },
      fill: '#ff0000',
      fixedToCamera: true,
      anchor: {
        x: 0.5,
        y: 0.5,
      },
    });
  }

  /**
   * @summary Handle game events
   */
  public update(): void {
    this.game.physics.arcade.collide(this.monkey, this.obstacles, this.onCollide, null, this);
    this.refreshTrack();
  }

  /**
   * @summary Handle collision event (of monkey and obstacles)
   * @param obj1
   * @param obj2
   */
  private onCollide(obj1: object, obj2: any): void {
    this.track.onIncorrect();
    this.game.camera.shake(0.01, 500);
    this.monkey.hit();
    this.answer.x = this.monkey.x + 50;
    this.nextObstacleIndex += 1;
    obj2.destroy();
    if (this.nextObstacleIndex >= this.obstacles.length - 1) {
      // End game
      return this.endGame();
    }
    this.obstacles[this.nextObstacleIndex].setRoute(this.monkey.route);
    this.answer.delete();
  }

  /**
   * @summary Fires when user answers correctly an obstacle
   */
  private onCorrect(): void {
    this.track.onCorrect();
    this.nextObstacleIndex += 1;
    if (this.nextObstacleIndex >= this.obstacles.length - 1) {
      // End game
      return this.endGame();
    }
    this.monkey.overcome();
    this.obstacles[this.nextObstacleIndex].setRoute(this.monkey.route);
    setTimeout(() => this.answer.delete(), 800);
  }

  private endGame(): void {
    this.game.destroy();
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
