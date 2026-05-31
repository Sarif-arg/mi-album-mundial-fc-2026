export const GROUPS = {
  "FWC": {
    name: "Especiales",
    teams: [
      { id: "FWC", name: "FIFA World Cup", short: "FWC" }
    ]
  },
  "A": {
    name: "Grupo A",
    teams: [
      { id: "USA", name: "Estados Unidos", short: "USA" },
      { id: "MEX", name: "México", short: "MEX" },
      { id: "CAN", name: "Canadá", short: "CAN" },
      { id: "PAN", name: "Panamá", short: "PAN" }
    ]
  },
  "B": {
    name: "Grupo B",
    teams: [
      { id: "ARG", name: "Argentina", short: "ARG" },
      { id: "BRA", name: "Brasil", short: "BRA" },
      { id: "URU", name: "Uruguay", short: "URU" },
      { id: "COL", name: "Colombia", short: "COL" }
    ]
  },
  "C": {
    name: "Grupo C",
    teams: [
      { id: "FRA", name: "Francia", short: "FRA" },
      { id: "ESP", name: "España", short: "ESP" },
      { id: "ENG", name: "Inglaterra", short: "ENG" },
      { id: "POR", name: "Portugal", short: "POR" }
    ]
  },
  "D": {
    name: "Grupo D",
    teams: [
      { id: "GER", name: "Alemania", short: "GER" },
      { id: "ITA", name: "Italia", short: "ITA" },
      { id: "NED", name: "Países Bajos", short: "NED" },
      { id: "BEL", name: "Bélgica", short: "BEL" }
    ]
  },
  "E": {
    name: "Grupo E",
    teams: [
      { id: "CRO", name: "Croacia", short: "CRO" },
      { id: "DEN", name: "Dinamarca", short: "DEN" },
      { id: "SUI", name: "Suiza", short: "SUI" },
      { id: "AUT", name: "Austria", short: "AUT" }
    ]
  },
  "F": {
    name: "Grupo F",
    teams: [
      { id: "MAR", name: "Marruecos", short: "MAR" },
      { id: "SEN", name: "Senegal", short: "SEN" },
      { id: "EGY", name: "Egipto", short: "EGY" },
      { id: "NGA", name: "Nigeria", short: "NGA" }
    ]
  },
  "G": {
    name: "Grupo G",
    teams: [
      { id: "JPN", name: "Japón", short: "JPN" },
      { id: "KOR", name: "Corea del Sur", short: "KOR" },
      { id: "AUS", name: "Australia", short: "AUS" },
      { id: "KSA", name: "Arabia Saudita", short: "KSA" }
    ]
  },
  "H": {
    name: "Grupo H",
    teams: [
      { id: "ECU", name: "Ecuador", short: "ECU" },
      { id: "CHI", name: "Chile", short: "CHI" },
      { id: "PAR", name: "Paraguay", short: "PAR" },
      { id: "PER", name: "Perú", short: "PER" }
    ]
  },
  "I": {
    name: "Grupo I",
    teams: [
      { id: "CRC", name: "Costa Rica", short: "CRC" },
      { id: "JAM", name: "Jamaica", short: "JAM" },
      { id: "HON", name: "Honduras", short: "HON" },
      { id: "SLV", name: "El Salvador", short: "SLV" }
    ]
  },
  "J": {
    name: "Grupo J",
    teams: [
      { id: "SWE", name: "Suecia", short: "SWE" },
      { id: "NOR", name: "Noruega", short: "NOR" },
      { id: "UKR", name: "Ucrania", short: "UKR" },
      { id: "POL", name: "Polonia", short: "POL" }
    ]
  },
  "K": {
    name: "Grupo K",
    teams: [
      { id: "CMR", name: "Camerún", short: "CMR" },
      { id: "GHA", name: "Ghana", short: "GHA" },
      { id: "ALG", name: "Argelia", short: "ALG" },
      { id: "TUN", name: "Túnez", short: "TUN" }
    ]
  },
  "L": {
    name: "Grupo L",
    teams: [
      { id: "IRN", name: "Irán", short: "IRN" },
      { id: "IRQ", name: "Irak", short: "IRQ" },
      { id: "QAT", name: "Qatar", short: "QAT" },
      { id: "UAE", name: "Emiratos Árabes", short: "UAE" }
    ]
  }
};

// Map of team colors/icons to make it visually attractive
export const TEAM_FLAGS = {
  USA: "🇺🇸", MEX: "🇲🇽", CAN: "🇨🇦", PAN: "🇵🇦",
  ARG: "🇦🇷", BRA: "🇧🇷", URU: "🇺🇾", COL: "🇨🇴",
  FRA: "🇫🇷", ESP: "🇪🇸", ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", POR: "🇵🇹",
  GER: "🇩🇪", ITA: "🇮🇹", NED: "🇳🇱", BEL: "🇧🇪",
  CRO: "🇭🇷", DEN: "🇩🇰", SUI: "🇨🇭", AUT: "🇦🇹",
  MAR: "🇲🇦", SEN: "🇸🇳", EGY: "🇪🇬", NGA: "🇳🇬",
  JPN: "🇯🇵", KOR: "🇰🇷", AUS: "🇦🇺", KSA: "🇸🇦",
  ECU: "🇪🇨", CHI: "🇨🇱", PAR: "🇵🇾", PER: "🇵🇪",
  CRC: "🇨🇷", JAM: "🇯🇲", HON: "🇭🇳", SLV: "🇸🇻",
  SWE: "🇸🇪", NOR: "🇳🇴", UKR: "🇺🇦", POL: "🇵🇱",
  CMR: "🇨🇲", GHA: "🇬🇭", ALG: "🇩🇿", TUN: "🇹🇳",
  IRN: "🇮🇷", IRQ: "🇮🇶", QAT: "🇶🇦", UAE: "🇦🇪",
  FWC: "🏆"
};

export const generateStickersList = () => {
  const stickers = [];

  // FWC Section (20 special stickers)
  for (let i = 1; i <= 20; i++) {
    const codeNum = i.toString().padStart(2, "0");
    const code = `FWC-${codeNum}`;
    stickers.push({
      code,
      teamId: "FWC",
      teamName: "FIFA World Cup",
      name: i === 1 ? "Trofeo Oficial" : i === 2 ? "Mascota" : i === 3 ? "Logo 2026" : i === 4 ? "Pelota Oficial" : `Estadio ${i - 4}`,
      isSpecial: true
    });
  }

  // Groups and Teams
  Object.keys(GROUPS).forEach(groupKey => {
    if (groupKey === "FWC") return;
    GROUPS[groupKey].teams.forEach(team => {
      for (let i = 1; i <= 20; i++) {
        const codeNum = i.toString().padStart(2, "0");
        const code = `${team.id}-${codeNum}`;
        stickers.push({
          code,
          teamId: team.id,
          teamName: team.name,
          name: i === 1 ? "Escudo" : `Jugador ${i - 1}`,
          isSpecial: i === 1 // Escudo is holographic
        });
      }
    });
  });

  return stickers;
};
