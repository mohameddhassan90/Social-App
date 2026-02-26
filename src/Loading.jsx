import React from 'react'
import { PropagateLoader} from '../node_modules/react-spinners'

export default function Loading() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <PropagateLoader></PropagateLoader>
      
      
    </div>
  )
}
