import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Home from '@/pages/Home'
import Dictionary from '@/pages/Dictionary'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="dictionary" element={<Dictionary />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}