import axios from 'axios'

// Configuração base da API
const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para log de requisições (apenas em desenvolvimento)
if (!import.meta.env.PROD) {
  api.interceptors.request.use(
    (config) => {
      console.log(`🔄 ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    (error) => {
      console.error('❌ Request Error:', error)
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`)
      return response
    },
    (error) => {
      console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`, error.response?.data)
      return Promise.reject(error)
    }
  )
}

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erros de rede
    if (!error.response) {
      console.error('Erro de rede ou servidor indisponível')
      return Promise.reject(new Error('Erro de conexão. Verifique sua internet e tente novamente.'))
    }

    // Tratamento de erros HTTP específicos
    switch (error.response.status) {
      case 400:
        console.error('Dados inválidos enviados')
        break
      case 401:
        console.error('Não autorizado')
        break
      case 403:
        console.error('Acesso negado')
        break
      case 404:
        console.error('Recurso não encontrado')
        break
      case 500:
        console.error('Erro interno do servidor')
        break
      default:
        console.error('Erro desconhecido:', error.response.status)
    }

    return Promise.reject(error)
  }
)

export default api