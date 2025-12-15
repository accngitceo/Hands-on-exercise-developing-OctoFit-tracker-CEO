export const API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`

export function apiUrl(resource) {
  return `${API_BASE}/${resource}/`
}
