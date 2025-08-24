import React from 'react'

const PageHeader = ({title}) => {
  return (
    <p className='font-semibold text-xl text-foreground mb-6 md:text-2xl'>{title}</p>
  )
}

export default PageHeader