import Navbar from '../components/Navbar'
import {Outlet} from 'react-router-dom'

export default function LayoutMain({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  )
}