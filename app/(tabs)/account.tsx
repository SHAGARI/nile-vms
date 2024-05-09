import Account from "@/components/Account";
import { useSupabase } from "@/contexts/supabase-provider";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native-elements";

export default function AccountPage() {
    const { session } = useSupabase()

    if (session && session.user) return <Account session={session} />
    // return <Redirect href="/auth" />
}