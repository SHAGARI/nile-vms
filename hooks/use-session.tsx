import { supabase } from "@/lib/supabase"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

export default function useSession() {
    const [session, setSession] = useState<Session | null>(null)


    console.log(session);
    
    useEffect(() => {
        const s = supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return session
}