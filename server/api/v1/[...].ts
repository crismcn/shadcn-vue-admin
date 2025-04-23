export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().public.apiBase
  const uriPath = event.path
  // 这里已经全局代理了所以token cookie等都要在这里去发送
  return proxyRequest(event, `${proxyUrl}${uriPath}`)
})
