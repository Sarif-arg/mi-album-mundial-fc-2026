const QR_PREFIX = 'MA26.';

const encodeBase64Url = (value) => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
};

const decodeBase64Url = (value) => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
};

const getStickerNumber = (code) => {
  const [, number] = code.split('-');
  return parseInt(number, 10);
};

const getBitIndex = (sticker) => {
  const number = getStickerNumber(sticker.code);
  return sticker.teamId === 'FWC' ? number : number - 1;
};

const addToMask = (masks, sticker) => {
  const current = masks[sticker.teamId] || 0n;
  masks[sticker.teamId] = current | (1n << BigInt(getBitIndex(sticker)));
};

const trimEmptyMasks = (masks) => {
  return Object.fromEntries(
    Object.entries(masks)
      .filter(([, mask]) => mask > 0n)
      .map(([teamId, mask]) => [teamId, mask.toString(36)])
  );
};

const decodeMask = (teamId, maskValue) => {
  const mask = BigInt(parseInt(maskValue, 36));
  const total = teamId === 'FWC' ? 21 : 20;
  const codes = [];

  for (let bit = 0; bit < total; bit += 1) {
    if ((mask & (1n << BigInt(bit))) !== 0n) {
      const number = teamId === 'FWC' ? bit : bit + 1;
      codes.push(`${teamId}-${number.toString().padStart(2, '0')}`);
    }
  }

  return codes;
};

export const createTradeQrPayload = (stickersList, stickerCounts) => {
  const repeats = {};
  const missing = {};

  stickersList.forEach((sticker) => {
    const count = stickerCounts[sticker.code] || 0;

    if (count === 0) {
      addToMask(missing, sticker);
    } else if (count > 1) {
      addToMask(repeats, sticker);
    }
  });

  const payload = {
    v: 1,
    r: trimEmptyMasks(repeats),
    m: trimEmptyMasks(missing)
  };

  return `${QR_PREFIX}${encodeBase64Url(JSON.stringify(payload))}`;
};

export const parseTradeQrPayload = (rawValue) => {
  const value = rawValue.trim();
  if (!value.startsWith(QR_PREFIX)) {
    throw new Error('El QR no pertenece a Mi Album Mundial 2026.');
  }

  const payload = JSON.parse(decodeBase64Url(value.slice(QR_PREFIX.length)));
  if (payload.v !== 1 || typeof payload.r !== 'object' || typeof payload.m !== 'object') {
    throw new Error('El QR tiene un formato incompatible.');
  }

  return {
    repeats: Object.entries(payload.r || {}).flatMap(([teamId, mask]) => decodeMask(teamId, mask)),
    missing: Object.entries(payload.m || {}).flatMap(([teamId, mask]) => decodeMask(teamId, mask))
  };
};

export const buildTradeMatches = ({ stickersList, stickerCounts, friendRepeats, friendMissing }) => {
  const stickerByCode = new Map(stickersList.map((sticker) => [sticker.code, sticker]));

  const receives = [...new Set(friendRepeats)]
    .map((code) => stickerByCode.get(code))
    .filter((sticker) => sticker && (stickerCounts[sticker.code] || 0) === 0);

  const gives = [...new Set(friendMissing)]
    .map((code) => stickerByCode.get(code))
    .filter((sticker) => sticker && (stickerCounts[sticker.code] || 0) > 1);

  return { receives, gives };
};
