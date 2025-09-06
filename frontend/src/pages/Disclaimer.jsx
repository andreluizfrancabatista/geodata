import React from 'react'
import { AlertTriangle, Info, Code, Database } from 'lucide-react'

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-8 w-8 text-agro-yellow-500 mr-3" />
          <h2 className="text-3xl font-bold text-gray-900">Disclaimer</h2>
        </div>
        <p className="text-gray-600 text-lg">
          Informações importantes sobre o uso desta aplicação
        </p>
      </div>

      {/* Main Disclaimer */}
      <div className="bg-agro-yellow-50 border border-agro-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-agro-yellow-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-agro-yellow-800 mb-2">
              Aviso Importante
            </h3>
            <p className="text-agro-yellow-800 text-lg font-medium">
              Esta aplicação é um <strong>MVP (Minimum Viable Product)</strong> e serve
              <strong> somente para demonstração</strong> de possíveis funcionalidades e conceitos.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Finalidade */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Info className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Finalidade</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Demonstração de conceitos de planejamento agrícola
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Prova de conceito para arquitetura de software
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Exemplo de implementação de interface responsiva
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Demonstração de integração frontend-backend
            </li>
          </ul>
        </div>

        {/* Limitações */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Limitações</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Dados simulados e não baseados em pesquisa real
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Algoritmos simplificados de produtividade
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Não considera variáveis climáticas reais
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Não substitui consultoria agronômica profissional
            </li>
          </ul>
        </div>
      </div>

      {/* Technical Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <Code className="h-6 w-6 text-agro-green-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-900">Informações Técnicas</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Frontend</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• React 18 com Vite</li>
              <li>• Tailwind CSS para estilização</li>
              <li>• Chart.js para gráficos</li>
              <li>• Axios para requisições HTTP</li>
              <li>• React Router para navegação</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Backend</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Node.js com Express</li>
              <li>• API REST para comunicação</li>
              <li>• Persistência em arquivos CSV</li>
              <li>• CORS habilitado</li>
              <li>• Geração de dados simulados</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <Database className="h-6 w-6 text-agro-brown-600 mr-3" />
          <h3 className="text-xl font-semibold text-gray-900">Fontes de Dados</h3>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Dados ENSO (El Niño/La Niña)</h4>
            <p className="text-gray-600 text-sm">
              Dados reais obtidos a partir da base de dados da
              <a
                href="https://iri.columbia.edu/our-expertise/climate/forecasts/enso/current/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                title="Mais informações sobre ENSO"
              >
              International Research Institute for Climate and Society (IRI)
              </a>. O boletim de previsão fornece um resumo mensal sobre a situação do 
              El Niño, La Niña e da Oscilação Sul (ENSO), com base no índice NINO3.4.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Produtividade das Culturas</h4>
            <p className="text-gray-600 text-sm">
              Valores aleatórios simulados com base em médias aproximadas.
              Para aplicações reais, deve-se utilizar dados ou pesquisas agronômicas específicas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Dados de Solo e Localização</h4>
            <p className="text-gray-600 text-sm">
              Informações simplificadas. Em produção, integrar com sistemas de SIG,
              dados do INCRA e mapas pedológicos detalhados.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-agro-green-50 border border-agro-green-200 rounded-lg p-6">
        <div className="flex items-start">
          <Info className="h-6 w-6 text-agro-green-600 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-agro-green-800 mb-3">
              Recomendações para Uso em Produção
            </h3>
            <ul className="space-y-2 text-agro-green-800">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-agro-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Integrar com APIs de dados meteorológicos oficiais
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-agro-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Implementar modelos agronômicos validados cientificamente
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-agro-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Adicionar autenticação e autorização de usuários
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-agro-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Implementar banco de dados robusto (PostgreSQL, MongoDB)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-agro-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Consultar especialistas agronômicos para validação
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer