import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sprout, Settings, AlertTriangle } from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()

  const navigation = [
    {
      name: 'Planejamento',
      href: '/planejamento',
      icon: Sprout,
      current: location.pathname === '/planejamento' || location.pathname === '/'
    },
    {
      name: 'Cadastro',
      href: '/cadastro',
      icon: Settings,
      current: location.pathname === '/cadastro'
    },
    {
      name: 'Disclaimer',
      href: '/disclaimer',
      icon: AlertTriangle,
      current: location.pathname === '/disclaimer'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sprout className="h-8 w-8 text-agro-green-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Planejador de Semeadura
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen border-r border-gray-200">
          <div className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                      ${item.current 
                        ? 'bg-agro-green-100 text-agro-green-700 border border-agro-green-200' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout