import React, { useState, useEffect } from 'react'
import { Plus, Trash2, MapPin, Wheat, CheckCircle, AlertCircle } from 'lucide-react'
import api from '../services/api'

const Cadastro = () => {
  const [activeTab, setActiveTab] = useState('talhoes')
  const [talhoes, setTalhoes] = useState([])
  const [culturas, setCulturas] = useState([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)

  // Forms state
  const [talhaoForm, setTalhaoForm] = useState({
    latitude: '',
    longitude: '',
    tipoSolo: ''
  })

  const [culturaForm, setCulturaForm] = useState({
    nome: ''
  })

  const tiposSolo = [
    'Latossolo Vermelho',
    'Argissolo Vermelho',
    'Neossolo Quartzarênico',
    'Nitossolo Vermelho',
    'Cambissolo Háplico',
    'Gleissolo Háplico'
  ]

  // Carregar dados
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [talhoesRes, culturasRes] = await Promise.all([
        api.get('/talhoes'),
        api.get('/culturas')
      ])
      setTalhoes(talhoesRes.data)
      setCulturas(culturasRes.data)
    } catch (error) {
      showNotification('Erro ao carregar dados', 'error')
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // Handlers para Talhões
  const handleTalhaoSubmit = async (e) => {
    e.preventDefault()
    
    if (!talhaoForm.latitude || !talhaoForm.longitude || !talhaoForm.tipoSolo) {
      showNotification('Todos os campos são obrigatórios', 'error')
      return
    }

    try {
      const response = await api.post('/talhoes', talhaoForm)
      setTalhoes([...talhoes, response.data])
      setTalhaoForm({ latitude: '', longitude: '', tipoSolo: '' })
      showNotification('Talhão cadastrado com sucesso!')
    } catch (error) {
      showNotification('Erro ao cadastrar talhão', 'error')
      console.error('Erro ao cadastrar talhão:', error)
    }
  }

  // Handlers para Culturas
  const handleCulturaSubmit = async (e) => {
    e.preventDefault()
    
    if (!culturaForm.nome) {
      showNotification('Nome da cultura é obrigatório', 'error')
      return
    }

    try {
      const response = await api.post('/culturas', culturaForm)
      setCulturas([...culturas, response.data])
      setCulturaForm({ nome: '' })
      showNotification('Cultura cadastrada com sucesso!')
    } catch (error) {
      showNotification('Erro ao cadastrar cultura', 'error')
      console.error('Erro ao cadastrar cultura:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agro-green-600"></div>
        <span className="ml-2 text-gray-600">Carregando...</span>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cadastros</h2>
        <p className="text-gray-600">Gerencie talhões e culturas do sistema</p>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`mb-6 p-4 rounded-lg flex items-center ${
          notification.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2" />
          )}
          {notification.message}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('talhoes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'talhoes'
                ? 'border-agro-green-500 text-agro-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MapPin className="h-5 w-5 inline mr-2" />
            Talhões
          </button>
          <button
            onClick={() => setActiveTab('culturas')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'culturas'
                ? 'border-agro-green-500 text-agro-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Wheat className="h-5 w-5 inline mr-2" />
            Culturas
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeTab === 'talhoes' && (
          <>
            {/* Formulário de Talhões */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Plus className="h-5 w-5 mr-2 text-agro-green-600" />
                Novo Talhão
              </h3>
              
              <form onSubmit={handleTalhaoSubmit} className="space-y-4">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    id="latitude"
                    step="any"
                    value={talhaoForm.latitude}
                    onChange={(e) => setTalhaoForm({...talhaoForm, latitude: e.target.value})}
                    placeholder="-18.9186"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro-green-500 focus:border-agro-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    id="longitude"
                    step="any"
                    value={talhaoForm.longitude}
                    onChange={(e) => setTalhaoForm({...talhaoForm, longitude: e.target.value})}
                    placeholder="-48.2772"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro-green-500 focus:border-agro-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="tipoSolo" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Solo
                  </label>
                  <select
                    id="tipoSolo"
                    value={talhaoForm.tipoSolo}
                    onChange={(e) => setTalhaoForm({...talhaoForm, tipoSolo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro-green-500 focus:border-agro-green-500"
                  >
                    <option value="">Selecione o tipo de solo</option>
                    {tiposSolo.map((tipo) => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-agro-green-600 text-white py-2 px-4 rounded-md hover:bg-agro-green-700 focus:outline-none focus:ring-2 focus:ring-agro-green-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cadastrar Talhão
                </button>
              </form>
            </div>

            {/* Lista de Talhões */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Talhões Cadastrados ({talhoes.length})
              </h3>
              
              {talhoes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhum talhão cadastrado</p>
                  <p className="text-sm">Cadastre o primeiro talhão ao lado</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {talhoes.map((talhao) => (
                    <div key={talhao.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Talhão {talhao.id}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            <strong>Coordenadas:</strong> {talhao.latitude}, {talhao.longitude}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Solo:</strong> {talhao.tipoSolo}
                          </p>
                        </div>
                        <button className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'culturas' && (
          <>
            {/* Formulário de Culturas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Plus className="h-5 w-5 mr-2 text-agro-green-600" />
                Nova Cultura
              </h3>
              
              <form onSubmit={handleCulturaSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Cultura
                  </label>
                  <input
                    type="text"
                    id="nome"
                    value={culturaForm.nome}
                    onChange={(e) => setCulturaForm({...culturaForm, nome: e.target.value})}
                    placeholder="Ex: Soja, Milho, Algodão..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro-green-500 focus:border-agro-green-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-agro-green-600 text-white py-2 px-4 rounded-md hover:bg-agro-green-700 focus:outline-none focus:ring-2 focus:ring-agro-green-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Cadastrar Cultura
                </button>
              </form>
            </div>

            {/* Lista de Culturas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Culturas Cadastradas ({culturas.length})
              </h3>
              
              {culturas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Wheat className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Nenhuma cultura cadastrada</p>
                  <p className="text-sm">Cadastre a primeira cultura ao lado</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {culturas.map((cultura) => (
                    <div key={cultura.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Wheat className="h-5 w-5 text-agro-green-600 mr-3" />
                          <h4 className="font-medium text-gray-900">{cultura.nome}</h4>
                        </div>
                        <button className="text-red-600 hover:text-red-800 p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cadastro