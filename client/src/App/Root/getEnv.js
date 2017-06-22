export default function () {
  const isProduction = window.location.hostname.includes('weeshing.com')
  return isProduction ? 'prod' : 'dev'
}
