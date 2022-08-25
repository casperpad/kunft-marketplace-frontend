export async function checkImage(url: string) {
  const res = await fetch(url)
  const buff = await res.blob()

  return buff.type.startsWith('image/')
}
