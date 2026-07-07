import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const IS_DEV = import.meta.env.DEV

function logDev(message, details) {
  if (!IS_DEV) return

  if (details) {
    console.warn(`[App de Pedidos] ${message}`, details)
    return
  }

  console.warn(`[App de Pedidos] ${message}`)
}

class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    logDev('Falha geral ao renderizar o app.', { error, info })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page">
          <div className="container">
            <div className="card">
              <div className="card-content">
                <h1 className="titulo-app">Não foi possível carregar o sistema</h1>
                <p className="subtitulo-app">
                  Atualize a página. Se o problema continuar, tente novamente mais tarde.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
