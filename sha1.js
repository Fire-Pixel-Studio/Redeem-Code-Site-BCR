// SHA1 from emn178/js-sha1 (CDN-free version)
function sha1(msg) {
  function rotate_left(n, s) {
    return (n << s) | (n >>> (32 - s));
  }

  function cvt_hex(val) {
    let str = "", i, v;
    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  }

  let blockstart;
  let i, j;
  let W = new Array(80);
  let H0 = 0x67452301;
  let H1 = 0xEFCDAB89;
  let H2 = 0x98BADCFE;
  let H3 = 0x10325476;
  let H4 = 0xC3D2E1F0;
  let A, B, C, D, E;
  let temp;

  msg = unescape(encodeURIComponent(msg));
  let msg_len = msg.length;

  let word_array = [];
  for (i = 0; i < msg_len - 3; i += 4) {
    j = msg.charCodeAt(i) << 24 |
      msg.charCodeAt(i + 1) << 16 |
      msg.charCodeAt(i + 2) << 8 |
      msg.charCodeAt(i + 3);
    word_array.push(j);
  }

  switch (msg_len % 4) {
    case 0:
      i = 0x080000000;
      break;
    case 1:
      i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
      break;
    case 2:
      i = msg.charCodeAt(msg_len - 2) << 24 |
        msg.charCodeAt(msg_len - 1) << 16 |
        0x08000;
      break;
    case 3:
      i = msg.charCodeAt(msg_len - 3) << 24 |
        msg.charCodeAt(msg_len - 2) << 16 |
        msg.charCodeAt(msg_len - 1) << 8 |
        0x80;
      break;
  }

  word_array.push(i);

  while ((word_array.length % 16) != 14) word_array.push(0);

  word_array.push(msg_len >>> 29);
  word_array.push((msg_len << 3) & 0x0ffffffff);

  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
    for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
    for (i = 16; i < 80; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;

    for (i = 0; i < 80; i++) {
      if (i < 20) {
        temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      } else if (i < 40) {
        temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      } else if (i < 60) {
        temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      } else {
        temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      }

      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }

  return (cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4)).toLowerCase();
}
