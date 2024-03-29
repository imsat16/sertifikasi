import Link from 'next/link'
import React from 'react'

const Navigation = () => {
  return (
    <nav className='bg-blue-500 text-white'>
        <div className="container mx-auto p-4 flex gap-5">
            <Link href={'/'}>
                Home
            </Link>
            <Link href={'/sertifikasi'}>
                Sertifikasi
            </Link>
        </div>
    </nav>
  )
}

export default Navigation