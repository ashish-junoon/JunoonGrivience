import React from 'react'
import "./PageLoader.css"

const PageLoader = () => {
  return (
    <div className="bg-black/60 h-[100vh] w-[100vw] flex justify-center items-center fixed left-0 top-0 z-90">
        <div>
            <div class="loader"></div>
        </div>
    </div>
  )
}

export default PageLoader