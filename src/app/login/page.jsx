import { LoginBody } from '../components/landingPage/LoginBody'
import { LoginForm } from '../components/landingPage/LoginForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { Toast, showToast } from '../components/shared/Toaster'
export default async function LoginPage () {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')
  return (
    <main className='w-full'>
      <LoginBody form={<LoginForm toast={showToast} />} />
      <Toast />
    </main>
  )
}
