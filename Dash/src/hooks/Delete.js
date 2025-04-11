import { useState } from "react";
import axios from "axios";
 
const useDeleteAxios =() =>{

    const delData = async(selectedItem )=>{

        if(!selectedItem.length){
            alert("Plzzz select a row")
        }

        const ItemIds = selectedItem.map(item => item.id)

        try{
            const response = await axios.delete(
                'http://172.16.130.8:6060/collect/bundle/update-categories',
                {
                    headers :{
                        aithorization : "1234rt"
                    },
                    data :ItemIds,
                
                } );

                console.log("Delete Done", response.data)
                return response.data;
        }catch (error) {
            console.error("❌ Delete Error:", error.message);
            throw error;
          }

    };
    return {delData}
}
export default useDeleteAxios;
