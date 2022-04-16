import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'
import { signIn, signOut, useSession } from 'next-auth/react'

export function SignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04D361" />
      {session.user.name}
      <FiX color="#738080" className={styles.closeIcon} />
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => {signIn('github')}}
    >
      <FaGithub color="#EBA417" />
      Sign in with Github
    </button>
  )
}