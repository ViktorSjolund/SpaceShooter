export enum GameState {
  Playing,
  Over,
  Won,
  Paused
}

export enum Level {
  One,
  Two,
  Endless
}

export enum UpgradeType {
  AddProjectile = 1,
  AddPierce = 2,
  AddDamageTen = 3,
  AddAttackRateTen = 4,
  AddDamageTwenty = 5,
  AddAttackRateTwenty = 6,
  AddDamageThirty = 7,
  AddAttackRateThirty = 8,
  DuplicateProjectiles = 9
}

export enum Character {
  Gunner = 1,
  Beamer = 2,
  Three = 3
}

export enum EnemyType {
  Splitter,
  Asteroid,
  Ufo,
  Gigantor
}
