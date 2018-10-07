// Game config

export class Config {
  gameWidth = this.getWindowSize();
  gameHeight = this.getWindowSize();

  private getWindowSize(): number {
    // Get the smaller dimension
    const w = window.innerWidth;
    const h = window.innerHeight;
    return w > h ? h - 150 : w - 150;
  }
}