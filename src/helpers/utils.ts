export function modeArray(array: any[], field: string) {
  if (array.length == 0) return null;
  var modeMap: any = {};
  var maxEl = array[0][field],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i][field];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

export function getSessionOfDay() {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr <= 12 && curHr > 3) {
    return 'morning';
  } else if (curHr <= 15 && curHr > 12) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}

export const formatStatName = (statName: string): string => {
  switch (statName) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Sp. Atk";
    case "special-defense":
      return "Sp. Def";
    case "speed":
      return "Speed";
    default:
      return statName;
  }
};

export const formatAbilityName = (abilityName: string): string => {
  return abilityName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  return typeColors[type] || "#777777";
};

export const getStatColor = (percentage: number): string => {
  if (percentage < 30) return "#ff5959";
  if (percentage < 50) return "#ff9c54";
  if (percentage < 70) return "#ffde54";
  if (percentage < 90) return "#a0e515";
  return "#23cd5e";
};

