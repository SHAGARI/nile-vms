import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { supabase } from "@/lib/supabase"
import { useSupabase } from "@/contexts/supabase-provider"

export default function useVisitor(id: number) {
  const { session } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [visitor, setVisitor] = useState<any | null>()

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      // console.log(session);
      

      const { data, error, status } = await supabase
        .from('visitor_passes')
        .select('*')
        .eq('id', id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setVisitor(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return { visitor, loading }
}