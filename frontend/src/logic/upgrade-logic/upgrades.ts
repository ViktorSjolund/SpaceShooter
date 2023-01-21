import { TUpgrade } from '@/types/types'
import { Character, UpgradeType } from '../util/enums'

export const upgrades: TUpgrade[] = Array.from([
  {
    id: UpgradeType.AddProjectile,
    cost: 3000,
    requirement: 1,
    description: 'Adds +1 projectile(s).',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner]
  },
  {
    id: UpgradeType.DuplicateProjectiles,
    cost: 30000,
    requirement: 59,
    description: 'Duplicates all projectiles.',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner]
  },
  {
    id: UpgradeType.AddDamageTen,
    cost: 1500,
    requirement: 5,
    description: 'Adds +10% increased damage to attacks.',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner, Character.Beamer]
  },
  {
    id: UpgradeType.AddDamageTwenty,
    cost: 15000,
    requirement: 24,
    description: 'Adds +20% increased damage to attacks.',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner, Character.Beamer]
  },
  {
    id: UpgradeType.AddDamageThirty,
    cost: 40000,
    requirement: 55,
    description: 'Adds +30% increased damage to attacks.',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner, Character.Beamer]
  },
  {
    id: UpgradeType.AddPierce,
    cost: 8000,
    requirement: 20,
    description: 'Adds +1 pierce for all projectiles.',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner]
  },
  {
    id: UpgradeType.AddAttackRateTen,
    cost: 1000,
    requirement: 8,
    description: 'Adds +10% increased fire rate to attacks.',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner, Character.Beamer]
  },
  {
    id: UpgradeType.AddAttackRateTwenty,
    cost: 8000,
    requirement: 25,
    description: 'Adds +20% increased fire rate to attacks.',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner, Character.Beamer]
  },
  {
    id: UpgradeType.AddAttackRateThirty,
    cost: 30000,
    requirement: 47,
    description: 'Adds +30% increased fire rate to attacks.',
    imgSrc: '/img/sword.png',
    characters: [Character.Gunner, Character.Beamer]
  }
])
