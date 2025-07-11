export interface UpgradeDefinition {
  id: string;
  name: string;
  description: string;
  type: 'click' | 'passive';
  baseCost: number;
  costMultiplier: number;
  baseEffectValue: number;
  effectMultiplier: number;
}

export interface Cosmetic {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'background' | 'clicker_skin';
  value: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  condition: (state: {
    astralCount: number;
    astralPerClick: number;
    astralPerSecond: number;
    purchasedUpgradeLevels: Map<string, number>;
    purchasedCosmetics: Set<string>;
  }) => boolean;
}

export const initialUpgrades: UpgradeDefinition[] = [
  { id: 'click1', name: 'Астральный Всплеск', description: 'Увеличивает Астрал за клик.', type: 'click', baseCost: 15, costMultiplier: 1.15, baseEffectValue: 1, effectMultiplier: 1.1 },
  { id: 'passive1', name: 'Звездная Пыль', description: 'Начинает производить Астрал в секунду.', type: 'passive', baseCost: 100, costMultiplier: 1.15, baseEffectValue: 1, effectMultiplier: 1.1 },
  { id: 'click2', name: 'Космический Импульс', description: 'Значительно увеличивает Астрал за клик.', type: 'click', baseCost: 100, costMultiplier: 1.15, baseEffectValue: 5, effectMultiplier: 1.1 },
  { id: 'passive2', name: 'Малая Туманность', description: 'Добавляет Астрала в секунду.', type: 'passive', baseCost: 500, costMultiplier: 1.15, baseEffectValue: 5, effectMultiplier: 1.1 },
  { id: 'click3', name: 'Галактический Удар', description: 'Огромное увеличение Астрала за клик!', type: 'click', baseCost: 1000, costMultiplier: 1.15, baseEffectValue: 20, effectMultiplier: 1.1 },
  { id: 'passive3', name: 'Кварковая Фабрика', description: 'Добавляет Астрала в секунду.', type: 'passive', baseCost: 2500, costMultiplier: 1.15, baseEffectValue: 20, effectMultiplier: 1.1 },
  { id: 'passive4', name: 'Черная Дыра', description: 'Производит Астрала в секунду.', type: 'passive', baseCost: 10000, costMultiplier: 1.15, baseEffectValue: 100, effectMultiplier: 1.1 },
  { id: 'click4', name: 'Вселенский Клик', description: 'Невероятное увеличение Астрала за клик!', type: 'click', baseCost: 5000, costMultiplier: 1.15, baseEffectValue: 50, effectMultiplier: 1.1 },
  { id: 'passive5', name: 'Мультивселенная', description: 'Производит Астрала в секунду.', type: 'passive', baseCost: 50000, costMultiplier: 1.15, baseEffectValue: 500, effectMultiplier: 1.1 },
  { id: 'passive6', name: 'Измерение Хаоса', description: 'Производит Астрала в секунду.', type: 'passive', baseCost: 250000, costMultiplier: 1.15, baseEffectValue: 2500, effectMultiplier: 1.1 },
  { id: 'click5', name: 'Божественный Клик', description: 'Максимальное увеличение Астрала за клик!', type: 'click', baseCost: 100000, costMultiplier: 1.15, baseEffectValue: 1000, effectMultiplier: 1.1 },
  { id: 'passive7', name: 'Космический Разум', description: 'Производит Астрала в секунду.', type: 'passive', baseCost: 1000000, costMultiplier: 1.15, baseEffectValue: 10000, effectMultiplier: 1.1 },
];

export const initialCosmetics: Cosmetic[] = [
  // Backgrounds
  { id: 'bg_default', name: 'Стандартный Фон', description: 'Базовый фон игры.', cost: 0, type: 'background', value: 'none' },
  { id: 'bg_stars', name: 'Звездное Поле', description: 'Мерцающее поле далеких звезд.', cost: 1000, type: 'background', value: 'https://i.postimg.cc/MT4SFCdm/image.jpg' },
  { id: 'bg_galaxy', name: 'Галактическое Сердце', description: 'Пульсирующая галактика в центре вселенной.', cost: 50000, type: 'background', value: 'https://i.postimg.cc/4dFfT7Nt/image.jpg' },
  { id: 'bg_nebula', name: 'Туманность Омега', description: 'Яркие цвета космической туманности.', cost: 250000, type: 'background', value: 'https://i.postimg.cc/yWCzVFqJ/image.jpg' },
  { id: 'bg_void', name: 'Квантовая Пустота', description: 'Глубокая и таинственная пустота.', cost: 1000000, type: 'background', value: 'https://i.postimg.cc/vTfZL8bV/image.jpg' },
  { id: 'bg_multiverse', name: 'Мультивселенский Коллапс', description: 'Вихрь реальностей, сливающихся воедино.', cost: 1500000000, type: 'background', value: 'https://i.postimg.cc/R0S46QWK/image.jpg' },

  // Clicker Skins
  { id: 'skin_default', name: 'Базовый Астрал', description: 'Стандартный вид Астральной сущности.', cost: 0, type: 'clicker_skin', value: 'https://i.postimg.cc/fRSJZP69/image.jpg' },
  { id: 'skin_radiant', name: 'Сияющий Астрал', description: 'Астрал, излучающий мощную энергию.', cost: 5000, type: 'clicker_skin', value: 'https://i.postimg.cc/RVwWwdZD/image.jpg' },
  { id: 'skin_ancient', name: 'Древний Артефакт', description: 'В разработке', cost: Infinity, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/ancient_artifact.jpg' },
  { id: 'skin_cosmic_egg', name: 'Космическое Яйцо', description: 'В разработке', cost: Infinity, type: 'clicker_skin', value: 'https://i.postimg.cc/pr211111/cosmic_egg.jpg' },
];

export const allAchievements: Achievement[] = [
  { id: 'astral_100', name: 'Начало Пути', description: 'Накопите 100 Астрала.', condition: (state) => state.astralCount >= 100 },
  { id: 'astral_1000', name: 'Астральный Накопитель', description: 'Накопите 1,000 Астрала.', condition: (state) => state.astralCount >= 1000 },
  { id: 'astral_10000', name: 'Мастер Астрала', description: 'Накопите 10,000 Астрала.', condition: (state) => state.astralCount >= 10000 },
  { id: 'astral_per_second_10', name: 'Пассивный Доход', description: 'Достигните 10 Астрала в секунду.', condition: (state) => state.astralPerSecond >= 10 },
  { id: 'astral_per_second_100', name: 'Астральный Поток', description: 'Достигните 100 Астрала в секунду.', condition: (state) => state.astralPerSecond >= 100 },
  { id: 'upgrades_3', name: 'Первые Шаги', description: 'Купите 3 уровня улучшений.', condition: (state) => Array.from(state.purchasedUpgradeLevels.values()).reduce((sum, level) => sum + level, 0) >= 3 },
  { id: 'upgrades_10', name: 'Опытный Инвестор', description: 'Купите 10 уровней улучшений.', condition: (state) => Array.from(state.purchasedUpgradeLevels.values()).reduce((sum, level) => sum + level, 0) >= 10 },
  { id: 'cosmetic_1', name: 'Модник', description: 'Купите 1 косметический предмет (кроме стартовых).', condition: (state) => state.purchasedCosmetics.size > 2 }, // bg_default and skin_default are 2
  { id: 'cosmetic_all_backgrounds', name: 'Коллекционер Фонов', description: 'Купите все фоны.', condition: (state) => {
    const allBackgrounds = initialCosmetics.filter(c => c.type === 'background' && c.cost !== 0);
    return allBackgrounds.every(bg => state.purchasedCosmetics.has(bg.id));
  }},
  { id: 'cosmetic_all_skins', name: 'Коллекционер Скинов', description: 'Купите все скины для кликера (кроме тех, что в разработке).', condition: (state) => {
    const allSkins = initialCosmetics.filter(c => c.type === 'clicker_skin' && c.cost !== 0 && c.cost !== Infinity);
    return allSkins.every(skin => state.purchasedCosmetics.has(skin.id));
  }},
];