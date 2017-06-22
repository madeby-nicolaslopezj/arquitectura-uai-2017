const isProduction = window.location.hostname.includes('weeshing.com')
const baseURL = isProduction ? 'https://api.analyzer.weeshing.com' : `http://${window.location.hostname}:3000`

export default baseURL
