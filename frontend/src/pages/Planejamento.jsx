import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import BoxPlot from '../components/BoxPlot'
import api from '../services/api'
import { Loader, TrendingUp } from 'lucide-react'

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Planejamento = () => {
  const [formData, setFormData] = useState({
    talhao: '',
    cultura: '',
    ciclo: 100,
    fenomeno: 'Neutro'
  })

  const [talhoes, setTalhoes] = useState([])
  const [culturas, setCulturas] = useState([])
  const [ensoData, setEnsoData] = useState([])
  const [produtividadeData, setProdutividadeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingProdutividade, setLoadingProdutividade] = useState(false)

  // Opções de ciclo
  const ciclosOptions = []
  for (let i = 80; i <= 150; i += 10) {
    ciclosOptions.push(i)
  }

  const fenomenosOptions = ['El Niño', 'Neutro', 'La Niña']

  // Carregar dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        const [talhoesRes, culturasRes, ensoRes] = await Promise.all([
          api.get('/talhoes'),
          api.get('/culturas'),
          api.get('/enso')
        ])

        setTalhoes(talhoesRes.data)
        setCulturas(culturasRes.data)
        setEnsoData(ensoRes.data)

        // Definir valores padrão se existirem dados
        if (talhoesRes.data.length > 0) {
          setFormData(prev => ({ ...prev, talhao: talhoesRes.data[0].id }))
        }
        if (culturasRes.data.length > 0) {
          setFormData(prev => ({ ...prev, cultura: culturasRes.data[0].nome }))
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Carregar dados de produtividade quando os inputs mudarem
  useEffect(() => {
    if (formData.cultura && formData.ciclo && formData.fenomeno) {
      loadProdutividadeData()
    }
  }, [formData.cultura, formData.ciclo, formData.fenomeno])

  const loadProdutividadeData = async () => {
    try {
      setLoadingProdutividade(true)
      const response = await api.get('/produtividade', {
        params: {
          cultura: formData.cultura,
          ciclo: formData.ciclo,
          fenomeno: formData.fenomeno
        }
      })
      setProdutividadeData(response.data)
    } catch (error) {
      console.error('Erro ao carregar dados de produtividade:', error)
    } finally {
      setLoadingProdutividade(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Configuração do gráfico ENSO
  const ensoChartData = {
    labels: ensoData.map(item => item.Season),
    datasets: [
      {
        label: 'La Niña (%)',
        data: ensoData.map(item => parseInt(item['La Niña'])),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      },
      {
        label: 'Neutro (%)',
        data: ensoData.map(item => parseInt(item.Neutral)),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1
      },
      {
        label: 'El Niño (%)',
        data: ensoData.map(item => parseInt(item['El Niño'])),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1
      }
    ]
  }

  const ensoChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Probabilidades de Fenômenos Climáticos ENSO (%)'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Probabilidade (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Estação'
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-agro-green-600" />
        <span className="ml-2 text-gray-600">Carregando dados...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Planejamento de Semeadura</h2>
        <p className="text-gray-600">Configure os parâmetros e visualize as análises de produtividade</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coluna de Inputs */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-agro-green-600" />
              Parâmetros de Planejamento
            </h3>

            <div className="space-y-4">
              {/* Talhão */}
              <div>
                <label htmlFor="talhao" className="block text-sm font-medium text-gray-700 mb-2">
                  Talhão
                </label>
                <select
                  id="talhao"
                  value={formData.talhao}
                  onChange={(e) => handleInputChange('talhao', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro-green-500 focus:border-agro-green-500"
                >
                  <option value="">Selecione um talhão</option>
                  {talhoes.map((talhao) => (
                    <option key={talhao.id} value={talhao.id}>
                      Talhão {talhao.id} - {talhao.tipoSolo} ({talhao.latitude}, {talhao.longitude})
                    </option>
                  ))}
                </select>
              </div>

              {/* Cultura */}
              <div>
                <label htmlFor="cultura" className="block text-sm font-medium text-gray-700 mb-2">
                  Cultura
                </label>
                <select
                  id="cultura"
                  value={formData.cultura}
                  onChange={(e) => handleInputChange('cultura', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro-green-500 focus:border-agro-green-500"
                >
                  <option value="">Selecione uma cultura</option>
                  {culturas.map((cultura) => (
                    <option key={cultura.id} value={cultura.nome}>
                      {cultura.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ciclo */}
              <div>
                <label htmlFor="ciclo" className="block text-sm font-medium text-gray-700 mb-2">
                  Ciclo (dias)
                </label>
                <select
                  id="ciclo"
                  value={formData.ciclo}
                  onChange={(e) => handleInputChange('ciclo', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro-green-500 focus:border-agro-green-500"
                >
                  {ciclosOptions.map((ciclo) => (
                    <option key={ciclo} value={ciclo}>
                      {ciclo} dias
                    </option>
                  ))}
                </select>
              </div>

              {/* Fenômeno Climático */}
              <div>
                <label htmlFor="fenomeno" className="block text-sm font-medium text-gray-700 mb-2">
                  Fenômeno Climático
                </label>
                <select
                  id="fenomeno"
                  value={formData.fenomeno}
                  onChange={(e) => handleInputChange('fenomeno', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-agro-green-500 focus:border-agro-green-500"
                >
                  {fenomenosOptions.map((fenomeno) => (
                    <option key={fenomeno} value={fenomeno}>
                      {fenomeno}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna de Outputs */}
        <div className="space-y-6">
          {/* Gráfico ENSO */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Fenômenos Climáticos ENSO</h3>
            {ensoData.length > 0 ? (
              <div className="h-64">
                <Bar data={ensoChartData} options={ensoChartOptions} />
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Carregando dados ENSO...
              </div>
            )}
          </div>

          {/* BoxPlot de Produtividade */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Produtividade Potencial</h3>
            {loadingProdutividade ? (
              <div className="h-64 flex items-center justify-center">
                <Loader className="h-6 w-6 animate-spin text-agro-green-600" />
                <span className="ml-2 text-gray-600">Calculando produtividade...</span>
              </div>
            ) : produtividadeData.length > 0 ? (
              <BoxPlot data={produtividadeData} />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Selecione uma cultura, ciclo e fenômeno para visualizar a produtividade
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Planejamento