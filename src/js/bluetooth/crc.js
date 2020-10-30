const getCrc = (str_bytes) => {
  let tmp_bytes = str_bytes.split(' ').map(function (s) {
    return parseInt(s, 16);
  });
  tmp_bytes.push(0);
  let bytes = new Int8Array(tmp_bytes.length);
  let crc = new Int8Array([0xff]);
  let b = false;
  for (let i = 0; i < bytes.length - 1; i++) {
    bytes[i] = tmp_bytes[i];
    crc[0] ^= bytes[i];
    for (let j = 0; j < 8; j++) {
      b = (crc[0] & 0x80) >> 7 !== 0;
      crc[0] = b ? (crc[0] << 1) ^ 0x31 : crc << 1;
    }
  }
  return '0x' + ('0' + (crc[0] & 0xff).toString(16)).slice(-2);
};
