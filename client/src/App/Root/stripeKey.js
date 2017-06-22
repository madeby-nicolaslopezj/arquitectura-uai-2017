import getEnv from './getEnv'
const prodKey = 'pk_live_WwyDaZGLDuRJwFuEOVhthfth'
const devKey = 'pk_test_PKpP8Yrki2MeIIts7PsMsxha'

export default getEnv() === 'prod' ? prodKey : devKey
