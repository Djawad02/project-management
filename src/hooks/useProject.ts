import { useQuery } from "@tanstack/react-query";

const useProject = (title:string) => useQuery({
    queryKey:['projects',title],
    
})