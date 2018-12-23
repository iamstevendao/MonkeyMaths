// Game config

import { Constants } from './Constants';

export class Config {
  public static gameWidth: number;
  public static gameHeight: number;
  public static routeOneY: number;
  public static routeTwoY: number;
  public static routeHeight: number;
  public static bannerY: number;

  constructor() {
    // Get the smaller dimension
    const widthWindow = window.innerWidth;
    const heightWindow = window.innerHeight - 150;
    const widthToCalculate = widthWindow / Constants.SCREEN_RATIO;
    Config.gameHeight = widthToCalculate > heightWindow ? heightWindow : widthToCalculate;
    Config.gameWidth = Config.gameHeight * Constants.SCREEN_RATIO;
    this.calculateRoute();
    this.calculateBanner();
  }

  private calculateBanner() {
    Config.bannerY = 50;
  }

  private calculateRoute() {
    Config.routeHeight = Math.floor((Config.gameHeight / 10) * 3) - 50;
    Config.routeOneY = (Config.gameHeight / 10) * 2;
    Config.routeTwoY = (Config.gameHeight / 10) * 5;
  }
}
