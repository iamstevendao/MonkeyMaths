// Main game state

import * as Phaser from 'phaser-ce';
import { Monkey } from '../sprites/Monkey';
import { Obstacle } from '../sprites/Obstacle';
import { Answer } from '../utils/Answer';
import { Notification } from '../utils/Notification';
import { Track } from '../utils/Track';
import { Constants } from '../utils/Constants';
import { Config } from '../utils/Config';
import { Global } from '../utils/Global';
import { Helpers } from '../utils/Helpers';

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
   * @summary Notification to the user
   */
  private notification: Notification;
  /**
   * @summary Banner starmaths
   */
  private banner: object;
  /**
   * @summary Score
   */
  private scoreText: Phaser.Text;
  /**
   * @summary Level
   */
  private levelText: Phaser.Text;
  /**
   * @summary Difficulty
   */
  private difficultyText: Phaser.Text;
  /**
   * @summary Speed
   */
  private speedText: Phaser.Text;
  /**
   * @summary last ten answer
   */
  private lastTenText: Phaser.Text;
  /**
   * @summary Range text
   */
  private rangeText: Phaser.Text;
  /**
   * @summary Tracking
   */
  private track: Track;

  public preload(): void {
    const background = this.game.add.sprite(0, 0, 'background');
    background.fixedToCamera = true;
    background.width = this.game.width;
    background.height = this.game.height;
  }

  /**
   * @summary Initialize game
   */
  public init(): void {
    this.game.world.setBounds(0, 0, 100000, this.game.height);
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
    this.initializeText();

    // Setup monkey
    this.monkey = new Monkey(this, 100, this.world.centerY);
    this.game.add.existing(this.monkey);

    // Setup answer
    this.answer = new Answer(this.game, this.game.width / 2, this.world.centerY);
    this.game.add.existing(this.answer);

    // Setup answer
    this.notification = new Notification(this.game, this.game.width / 2 - 100, this.world.centerY);
    this.game.add.existing(this.notification);

    // Initialize obstacles list, hard-coded to be 100 right now
    for (let i = 1; i < 100; i += 1) {
      const obstacle = new Obstacle(
        this.game, Constants.DISTANCE_OBSTACLES * i, this.world.centerY,
      );
      Object.assign(obstacle, { originalIndex: i });
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

  private initializeText(): void {
    this.initializeScoreText();
    this.initializeLevelText();
    this.initializeSpeedText();
    this.initializeDifficultyText();
    this.initializeLastTenText();
    this.initializeRangeText();
  }

  private initializeScoreText(): void {
    this.scoreText = this.add.text(this.game.width / 4, Config.bannerY, '', null);
    this.attachStyle(this.scoreText);
  }

  private initializeLevelText(): void {
    this.levelText = this.add.text(this.game.width * 3 / 4, Config.bannerY, '', null);
    this.attachStyle(this.levelText);
  }

  private initializeDifficultyText(): void {
    this.difficultyText = this.add.text(this.game.width / 5, this.game.height - 20, '', null);
    this.attachStyle(this.difficultyText, {
      fontSize: Constants.FONT_SIZE_SM,
      fill: '#fff',
    });
  }

  private initializeSpeedText(): void {
    this.speedText = this.add.text(this.game.width * 4 / 5, this.game.height - 20, '', null);
    this.attachStyle(this.speedText, {
      fontSize: Constants.FONT_SIZE_SM,
      fill: '#fff',
    });
  }

  private initializeRangeText(): void {
    this.rangeText = this.add.text(this.game.width * 2.5 / 5, this.game.height - 20, '', null);
    this.attachStyle(this.rangeText, {
      fontSize: Constants.FONT_SIZE_SM,
      fill: '#fff',
    });
  }

  private initializeLastTenText(): void {
    this.lastTenText = this.add.text(this.game.width / 2, this.game.height - 50, '', null);
    this.attachStyle(this.lastTenText, {
      fill: '#fff',
    });
  }

  private refreshTrack(): void {
    this.scoreText.setText(`Score: ${this.track.getScore()}`);
    this.levelText.setText(`Level: ${this.track.getLevel()}`);
    this.difficultyText.setText(`Difficulty: ${this.track.getDifficulty()}`);
    this.speedText.setText(`Speed: ${Helpers.getSpeed()} quiz/mins`);
    this.rangeText.setText(`Range: ${Helpers.getRange().toUpperCase()}`);
    const lastTen = this.track.getLastTen().map(x => `${x ? 'T' : 'F'}`).join(' ');
    this.lastTenText.setText(`Last ten answers: ${lastTen}`);
  }

  private attachStyle(obj, customStyle = {}): void {
    Object.assign(obj, {
      font: Constants.FONT_MAIN,
      fontSize: Constants.FONT_SIZE_MD,
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
      ...customStyle,
    });
  }

  /**
   * @summary Handle game events
   */
  public update(): void {
    this.game.physics.arcade.collide(
      this.monkey, this.obstacles, this.onCollide, this.onPreCollide, this);
    this.refreshTrack();
  }

  private onPreCollide(obj1: object, obj2: any): boolean {
    if (obj2.originalIndex <= this.nextObstacleIndex) {
      obj2.destroy();
      this.notification.show(Notification.SO_CLOSE);
      return false;
    }
    return true;
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
    this.obstacles[this.nextObstacleIndex].updateQuestion();
    this.obstacles[this.nextObstacleIndex].setRoute(this.monkey.route);
    this.answer.delete();
  }

  /**
   * @summary Fires when user answers correctly an obstacle
   */
  private onCorrect(): void {
    this.track.onCorrect();
    this.nextObstacleIndex += 1;
    this.monkey.overcome();
    if (this.nextObstacleIndex >= this.obstacles.length - 1) {
      // End game
      return this.endGame();
    }
    this.obstacles[this.nextObstacleIndex].updateQuestion();
    this.obstacles[this.nextObstacleIndex].setRoute(this.monkey.route);
    setTimeout(() => this.answer.delete(), 800);
  }

  private endGame(): void {
    setTimeout(
      () => {
        this.world.setBounds(0, 0, this.game.width, this.game.height);
        this.state.start('Score');
      },
      2000);
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
