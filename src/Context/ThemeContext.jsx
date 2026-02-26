import React, { createContext, useState } from 'react'



export const themeContext=createContext()


export default function ThemeContextProvider({children}) {
    const [theme,setTheme] = useState(localStorage.getItem('theme')||"light")
    function toggle(){
        if(theme=='light'){
            setTheme('dark')
            localStorage.setItem('theme','dark')
        }else{
            setTheme('light')
            localStorage.setItem('theme','light')
        }
    }


  return (
    <themeContext.Provider value={{theme,toggle}}>
      {children}
    </themeContext.Provider>
  )
}
