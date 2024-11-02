import { FC, PropsWithChildren } from 'react'
import { Header } from './header'

const routes = []  


const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
