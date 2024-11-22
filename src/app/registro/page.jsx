import { RegisterBody } from '../components/landingPage/RegisterBody'
import { RegisterForm } from '../components/landingPage/RegisterForm'
import { Toast, showToast } from '../components/shared/Toaster'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function RegisterPage () {
  const session = await getServerSession(authOptions)
  if (session) redirect('/')
  return (
    <main className='w-full'>
      <RegisterBody form={<RegisterForm toast={showToast} />} />
      <Toast />
    </main>
  )
}
