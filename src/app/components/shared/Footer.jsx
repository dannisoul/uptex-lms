import { DocenteNavbar } from './DocenteNavbar'
import { AlumnoNavBar } from './AlumnoNavbar'

export function Footer ({ rol }) {
  const navbar = getNavbar(rol)
  return (
    <footer className='p-10 lg:text-base text-sm'>
      <header>
        <img className='w-[115px] dark:invert' src='/logos/uptex.webp' alt='' />
      </header>
      <div className='flex gap-4 justify-between py-10 border-b-2 border-alpha-bg/20 flex-wrap'>
        {navbar &&
          <div>
            <h5 className='font-bold dark:text-white'>Mapa del Sitio</h5>
            <ul className='mt-4 text-primary-text dark:text-dark-primary-text'>
              {navbar}
            </ul>
          </div>}
        <div>
          <h5 className='font-bold dark:text-white'>Sitios de Interes</h5>
          <ul className='mt-4 text-primary-text dark:text-dark-primary-text'>
            <li>Oferta Educativa</li>
            <li>Sobre Nosotros</li>
            <li>Marco Jurídico</li>
            <li>Maestría en Comercio</li>
          </ul>
        </div>
        <div>
          <h5 className='font-bold dark:text-white'>Acerca de</h5>
          <ul className='mt-4 text-primary-text dark:text-dark-primary-text'>
            <li>Conoce tu Estado</li>
            <li>Quejas y Denuncias</li>
            <li>Comisión Estatal</li>
          </ul>
        </div>
        <div className='w-[345px] dark:text-white'>
          <h5 className='font-bold'>Contacto</h5>
          <p className='mt-4 text-primary-text dark:text-dark-primary-text'>Universidad Politécnica de Texcoco Carretera Federal Los Reyes Texcoco Km 14 + 200, San Miguel Coatlinchán Edo. de Méx. C.P. 56250(52) 595 92 1 30 27</p>
        </div>
      </div>
      <div className='mt-10 flex justify-between items-center'>
        <span className='text-primary-text dark:text-dark-primary-text'>&copy; 2022 UPTEX Todos los derechos reservados.</span>
        <ul className='flex gap-4'>
          <li><a href=''><img className='w-8' src='/logos/twitter.svg' alt='' /></a></li>
          <li><a href=''><img className='w-8' src='/logos/facebook.svg' alt='' /></a></li>
          <li><a href=''><img className='w-8' src='/logos/instagram.svg' alt='' /></a></li>
        </ul>
      </div>
    </footer>
  )
}

function getNavbar (rol) {
  switch (rol) {
    case 1:{
      return null
    }
    case 2:{
      return <DocenteNavbar />
    }
    case 3:{
      return <AlumnoNavBar />
    }
  }
}
