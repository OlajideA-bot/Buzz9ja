import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { ScrollManager } from './components/layout/ScrollManager'
import { routes } from './config/site'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Privacy } from './pages/Privacy'
import { RefundPolicy } from './pages/RefundPolicy'
import { Terms } from './pages/Terms'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={routes.terms} element={<Terms />} />
          <Route path={routes.privacy} element={<Privacy />} />
          <Route path={routes.refundPolicy} element={<RefundPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
