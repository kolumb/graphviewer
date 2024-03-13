export function assert(condition: boolean, message?: string) {
  if (!condition) {
    throw new Error(message);
  }
}
export function todo(description: string | undefined) {
  assert(false, "Not implemented. " + (description ? description : ""));
}
type keyValuePair = { [key: string]: string | number };
export function Enum(list: string[]) {
  return list.reduce(
    (enumeration: keyValuePair, element, i) => {
      enumeration[element] = element;
      return enumeration;
    },
    { length: list.length } as keyValuePair
  );
}

// function mod(n, limit) {
//     return ((n % limit) + limit) % limit;
// }

// function range(start, end) {
//     console.assert(
//         start <= end,
//         `Range start should be smaller that range end. (${start} < ${end})`
//     );
//     return Array.from(new Array(end - start + 1), (_, i) => start + i);
// }

// function randomColor() {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     return `rgb(${r},${g},${b})`;
// }

// function clamp(n, limit) {
//     let lim = Math.abs(limit);
//     if (Math.abs(n) > lim) {
//         return n < 0 ? -lim : lim;
//     }
//     return n;
// }

// const distPointToLine = (p, l1, l2) =>
//     Math.abs((l2.x - l1.x) * (l1.y - p.y) - (l1.x - p.x) * (l2.y - l1.y)) /
//     Math.sqrt((l2.x - l1.x) ** 2 + (l2.y - l1.y) ** 2);

// const determinant = (p, l1, l2) =>
//     (l2.x - l1.x) * (p.y - l1.y) - (l2.y - l1.y) * (p.x - l1.x);

// function normalizeAngle(a) {
//     a %= Math.PI * 2
//     return a > Math.PI
//         ? a - 2 * Math.PI
//         : a < -Math.PI
//             ? a + 2 * Math.PI
//             : a
// }

// function toggleFullScreen() {
//     if (!document.fullscreenElement) {
//         document.documentElement.requestFullscreen();
//     } else {
//         if (document.exitFullscreen) {
//             document.exitFullscreen();
//         }
//     }
// }
