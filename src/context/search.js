import { useState,useEffect,useContext,createContext } from "react";
import axios from 'axios'

const SearchContext=createContext()


const SearchProvider=({children})=>{

    const [Search,setSearch]=useState({
       keyword:"",
       results:[]
    })

 

    return (
        <SearchContext.Provider value={[Search,setSearch]}>
            {children}
        </SearchContext.Provider>
    )

}

//custom hook 
const useSearch=()=>useContext(SearchContext)

export {useSearch,SearchProvider}