export function compareVersions (a, b) {
  const segmentsA = a.np.split('.').map(Number)
  const segmentsB = b.np.split('.').map(Number)

  for (let i = 0; i < Math.max(segmentsA.length, segmentsB.length); i++) {
    const numA = segmentsA[i] || 0
    const numB = segmentsB[i] || 0

    if (numA < numB) {
      return -1
    } else if (numA > numB) {
      return 1
    }
  }

  return 0
}
