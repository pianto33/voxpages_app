import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successful login, redirect to the desired URL
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error('Supabase Auth Error:', error.message)
    }
  }

  // return the user to login with an error
  // If the locale is missing, it will redirect to the default locale due to middleware
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate`)
}
