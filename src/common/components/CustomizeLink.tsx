import Link from 'next/link'
import React from 'react'

// Definir la interface para los props del componente
interface CustomizeLinkProps {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

const CustomizeLink = ({ children, href, ...props }: CustomizeLinkProps) => {
  return (
    <Link href={`/${href}`} {...props}>
      {children}
    </Link>
  )
}

export default CustomizeLink
