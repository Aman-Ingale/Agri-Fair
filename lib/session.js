"use server"
import { SignJWT, jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const key = new TextEncoder().encode('aman')

const cookie = {
  name: 'session',
  options: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' },
  duration: 24 * 60 * 60 * 1000
}

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'] // ✅ typo fixed
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(userId) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ userId, expires })

  cookies().set(cookie.name, session, { ...cookie.options, expires })
}

export async function verifySession() {
  const cookieValue = cookies().get(cookie.name)?.value
  const session = await decrypt(cookieValue)
  if (!session?.userId) {
    redirect('/login')
  }
  return { userId: session.userId }
}

export async function deleteSession(params) {
  await cookies().delete('role');
  await cookies().delete('id');
  (await cookies()).delete(cookie.name)
}
