// Constants

/**
 * @summary Constants class
 */
export abstract class Constants {
  public static readonly DIFFICULTY_DECREASE = 0.4;
  public static readonly DIFFICULTY_INCREASE = 0.8;
  public static readonly DIFFICULTY_RANGE = ['a', 'b', 'b', 'c', 'c'];
  public static readonly DIFFICULTY_SPEED = [10, 12.5, 15, 17.5, 20];
  public static readonly DISTANCE_OBSTACLES = 1000;
  public static readonly FONT_MAIN = 'Press Start 2P';
  public static readonly FONT_SIZE_LG = 30;
  public static readonly FONT_SIZE_MD = 18;
  public static readonly FONT_SIZE_SM = 14;
  public static readonly VELOCITY_GAP = 10;
  public static readonly VELOCITY_INI = 200;
  public static readonly VELOCITY_MAX = 300;
  public static readonly VELOCITY_MIN = 150;
  public static readonly RANGES = [
    // LEVEL 1
    {
      addition: {
        a: {
          x: [1, 10],
          y: [1, 10],
        },
        b: {
          x: [5, 15],
          y: [5, 15],
        },
        c: {
          x: [16, 25],
          y: [16, 25],
        },
      },
      multiplication: {
        a: {
          x: [1, 10],
          y: [1, 3],
        },
        b: {
          x: [1, 10],
          y: [1, 5],
        },
        c: {
          x: [1, 10],
          y: [1, 7],
        },
      },
    },
    // LEVEL 2
    {
      addition: {
        a: {
          x: [16, 25],
          y: [16, 25],
        },
        b: {
          x: [25, 35],
          y: [25, 35],
        },
        c: {
          x: [35, 45],
          y: [35, 45],
        },
      },
      multiplication: {
        a: {
          x: [2, 10],
          y: [2, 3],
        },
        b: {
          x: [2, 10],
          y: [2, 7],
        },
        c: {
          x: [2, 10],
          y: [2, 8],
        },
      },
    },
    // LEVEL 3
    {
      addition: {
        a: {
          x: [36, 45],
          y: [36, 45],
        },
        b: {
          x: [45, 55],
          y: [45, 55],
        },
        c: {
          x: [55, 65],
          y: [55, 65],
        },
      },
      multiplication: {
        a: {
          x: [2, 10],
          y: [2, 7],
        },
        b: {
          x: [2, 10],
          y: [2, 10],
        },
        c: {
          x: [2, 10],
          y: [2, 12],
        },
      },
    },
    // LEVEL 4
    {
      addition: {
        a: {
          x: [55, 65],
          y: [55, 65],
        },
        b: {
          x: [65, 75],
          y: [65, 75],
        },
        c: {
          x: [75, 99],
          y: [75, 99],
        },
      },
      multiplication: {
        a: {
          x: [2, 7],
          y: [2, 12],
        },
        b: {
          x: [2, 10],
          y: [2, 12],
        },
        c: {
          x: [2, 12],
          y: [2, 12],
        },
      },
    },
    // LEVEL 5
    {
      addition: {
        a: {
          x: [99, 150],
          y: [99, 150],
        },
        b: {
          x: [150, 250],
          y: [150, 250],
        },
        c: {
          x: [250, 350],
          y: [250, 350],
        },
      },
      multiplication: {
        a: {
          x: [2, 10],
          y: [2, 12],
        },
        b: {
          x: [2, 12],
          y: [2, 12],
        },
        c: {
          x: [2, 12],
          y: [2, 14],
        },
      },
    },
    // LEVEL 6
    {
      addition: {
        a: {
          x: [350, 400],
          y: [350, 400],
        },
        b: {
          x: [400, 450],
          y: [400, 450],
        },
        c: {
          x: [450, 499],
          y: [450, 499],
        },
      },
      multiplication: {
        a: {
          x: [2, 10],
          y: [2, 14],
        },
        b: {
          x: [2, 12],
          y: [2, 14],
        },
        c: {
          x: [2, 14],
          y: [2, 14],
        },
      },
    },
  ];
  public static readonly SCREEN_RATIO = 2;
  public static readonly KEYBOARD_WIDTH = 150;
}
