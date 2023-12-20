export function U64FromBytes(x: number[]) {
  let u64 = BigInt(0);
  for (let i = x.length - 1; i >= 0; i--) {
    u64 = (u64 << BigInt(8)) | BigInt(x[i] ?? 0);
  }
  return u64;
}
