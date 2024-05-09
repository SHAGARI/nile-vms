import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { supabase } from "@/lib/supabase"
import { useSupabase } from "@/contexts/supabase-provider"

export default function useVisitors() {
  const { session } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [visitors, setVisitors] = useState<any[]>([])

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
        .eq('user', session?.user.id)
        .order("created_at", { ascending: false })
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setVisitors(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const channels = supabase.channel('custom-all-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'visitor_passes' },
    (payload) => {
    //   console.log('Change received!', payload)
        setVisitors([ payload.new, ...visitors ])
    }
  )
  .subscribe()

  return { visitors, loading }
}