export const GROUPS = {
  "FWC": {
    name: "Especiales",
    teams: [
      { id: "FWC", name: "FIFA World Cup", short: "FWC" }
    ]
  },
  "HOST": {
    name: "Anfitriones",
    teams: [
      { id: "CAN", name: "Canadá", short: "CAN" },
      { id: "MEX", name: "México", short: "MEX" },
      { id: "USA", name: "Estados Unidos", short: "USA" }
    ]
  },
  "AFC": {
    name: "AFC (Asia)",
    teams: [
      { id: "AUS", name: "Australia", short: "AUS" },
      { id: "IRN", name: "RI de Irán", short: "IRN" },
      { id: "JPN", name: "Japón", short: "JPN" },
      { id: "JOR", name: "Jordania", short: "JOR" },
      { id: "KOR", name: "República de Corea", short: "KOR" },
      { id: "QAT", name: "Catar", short: "QAT" },
      { id: "KSA", name: "Arabia Saudí", short: "KSA" },
      { id: "UZB", name: "Uzbekistán", short: "UZB" },
      { id: "IRQ", name: "Irak", short: "IRQ" }
    ]
  },
  "CAF": {
    name: "CAF (África)",
    teams: [
      { id: "ALG", name: "Argelia", short: "ALG" },
      { id: "CPV", name: "Cabo Verde", short: "CPV" },
      { id: "CIV", name: "Costa de Marfil", short: "CIV" },
      { id: "EGY", name: "Egipto", short: "EGY" },
      { id: "GHA", name: "Ghana", short: "GHA" },
      { id: "MAR", name: "Marruecos", short: "MAR" },
      { id: "SEN", name: "Senegal", short: "SEN" },
      { id: "RSA", name: "Sudáfrica", short: "RSA" },
      { id: "TUN", name: "Túnez", short: "TUN" },
      { id: "COD", name: "RD Congo", short: "COD" }
    ]
  },
  "CONCACAF": {
    name: "CONCACAF",
    teams: [
      { id: "CUW", name: "Curazao", short: "CUW" },
      { id: "HAI", name: "Haití", short: "HAI" },
      { id: "PAN", name: "Panamá", short: "PAN" }
    ]
  },
  "CONMEBOL": {
    name: "CONMEBOL",
    teams: [
      { id: "ARG", name: "Argentina", short: "ARG" },
      { id: "BRA", name: "Brasil", short: "BRA" },
      { id: "COL", name: "Colombia", short: "COL" },
      { id: "ECU", name: "Ecuador", short: "ECU" },
      { id: "PAR", name: "Paraguay", short: "PAR" },
      { id: "URU", name: "Uruguay", short: "URU" }
    ]
  },
  "OFC": {
    name: "OFC (Oceanía)",
    teams: [
      { id: "NZL", name: "Nueva Zelanda", short: "NZL" }
    ]
  },
  "UEFA": {
    name: "UEFA (Europa)",
    teams: [
      { id: "AUT", name: "Austria", short: "AUT" },
      { id: "BEL", name: "Bélgica", short: "BEL" },
      { id: "BIH", name: "Bosnia y Herzegovina", short: "BIH" },
      { id: "CRO", name: "Croacia", short: "CRO" },
      { id: "CZE", name: "República Checa", short: "CZE" },
      { id: "ENG", name: "Inglaterra", short: "ENG" },
      { id: "FRA", name: "Francia", short: "FRA" },
      { id: "GER", name: "Alemania", short: "GER" },
      { id: "NED", name: "Países Bajos", short: "NED" },
      { id: "NOR", name: "Noruega", short: "NOR" },
      { id: "POR", name: "Portugal", short: "POR" },
      { id: "SCO", name: "Escocia", short: "SCO" },
      { id: "ESP", name: "España", short: "ESP" },
      { id: "SWE", name: "Suecia", short: "SWE" },
      { id: "SUI", name: "Suiza", short: "SUI" },
      { id: "TUR", name: "Turquía", short: "TUR" }
    ]
  }
};

export const TEAM_FLAGS = {
  // Hosts
  CAN: "🇨🇦", MEX: "🇲🇽", USA: "🇺🇸",
  // AFC
  AUS: "🇦🇺", IRN: "🇮🇷", JPN: "🇯🇵", JOR: "🇯🇴", KOR: "🇰🇷", QAT: "🇶🇦", KSA: "🇸🇦", UZB: "🇺🇿", IRQ: "🇮🇶",
  // CAF
  ALG: "🇩🇿", CPV: "🇨🇻", CIV: "🇨🇮", EGY: "🇪🇬", GHA: "🇬🇭", MAR: "🇲🇦", SEN: "🇸🇳", RSA: "🇿🇦", TUN: "🇹🇳", COD: "🇨🇩",
  // CONCACAF
  CUW: "🇨🇼", HAI: "🇭🇹", PAN: "🇵🇦",
  // CONMEBOL
  ARG: "🇦🇷", BRA: "🇧🇷", COL: "🇨🇴", ECU: "🇪🇨", PAR: "🇵🇾", URU: "🇺🇾",
  // OFC
  NZL: "🇳🇿",
  // UEFA
  AUT: "🇦🇹", BEL: "🇧🇪", BIH: "🇧🇦", CRO: "🇭🇷", CZE: "🇨🇿", ENG: "🏴\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁧\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁢\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁥\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁮\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁧\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁿", FRA: "🇫🇷", GER: "🇩🇪", NED: "🇳🇱", NOR: "🇳🇴", POR: "🇵🇹", SCO: "🏴\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁧\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁢\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁣\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁴\u00ad\u00ad\u00ad\u00ad\u00ad\u00ad󠁿", ESP: "🇪🇸", SWE: "🇸🇪", SUI: "🇨🇭", TUR: "🇹🇷",
  // Special
  FWC: "🏆"
};

export const generateStickersList = () => {
  const stickers = [];

  // FWC Section (FWC-00 to FWC-20, total 21 stickers)
  for (let i = 0; i <= 20; i++) {
    const codeNum = i.toString().padStart(2, "0");
    const code = `FWC-${codeNum}`;
    stickers.push({
      code,
      teamId: "FWC",
      teamName: "FIFA World Cup",
      name: i === 0 ? "Álbum Logo" : i === 1 ? "Trofeo Oficial" : i === 2 ? "Mascota" : i === 3 ? "Logo 2026" : i === 4 ? "Pelota Oficial" : `Estadio ${i - 4}`,
      isSpecial: true
    });
  }

  // Groups and Teams (organized by confederations)
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
