import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/lib/types'

/**
 * Check if the currently logged-in user has the 'admin' role.
 * Returns the profile if admin, null otherwise.
 */
export async function getAdminProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>()

  if (!profile || profile.role !== 'admin') return null
  return profile
}

/**
 * Get the current user's profile (authenticated).
 */
export async function getCurrentProfile(): Promise<{ profile: Profile; email: string } | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single<Profile>()

  if (!profile) return null
  return { profile, email: user.email ?? '' }
}
