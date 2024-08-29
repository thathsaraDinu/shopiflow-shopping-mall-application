import { getPromotions } from "@/api/promotion.api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export function AllPromotions (){

    const {data, isLoading} = useQuery({
        queryKey: ['promotions'],
        queryFn: getPromotions,
    });

   console.log(data)

    return(
        <div>
            
            <h1>All Promotions</h1>
        </div>
    ) 
}