import axios from 'axios';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import Input from './Input';

function UnlockIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 m-auto group-hover:opacity-100">
      <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
    </svg>);
}

export default function Login(): JSX.Element {
  const [ cookies, setCookie ] = useCookies([ 'session' ]);
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ loginError, setLoginError ] = useState(false);

  const router: NextRouter = useRouter();

  const SignIn: (event: any) => Promise<void> = async (event: any): Promise<void> => {
    event.preventDefault();
    if (username && password) {
      try {
        const response = await axios.get('/api/accounts', {
          params: {
            username,
            password,
          },
        });
        setCookie('session', { username: response.data.username, firstName: response.data.firstName, lastName: response.data.lastName }, { path: '/' });
        router.push('/library');
      } catch (error) {
        setLoginError(true);
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-white m-auto rounded-xl p-12 shadow w-96">
      <form onSubmit={SignIn}>
        <div className='space-y-4'>
          <Input name="Username" value={username} onchange={(event: any): void => setUsername(event.target.value)}/>
          <Input name="Password" type="password" value={password} onchange={(event: any): void => setPassword(event.target.value)} />
        </div>
        {loginError && <div className='text-red-500 text-sm mt-1'>Incorrect username or password.</div> }
        <button className='bg-gray-500 p-2.5 text-white rounded-lg w-full mt-8 flex hover:bg-gray-600 transition group'>
          <div className='flex m-auto'>
            <UnlockIcon />
            <div className='ml-2'>Sign In</div>
          </div>
        </button>
        <div className='text-sm m-auto mt-2 text-gray-500 group cursor-pointer w-max'>Or
          <Link href="/signup">
            <span className='font-bold group-hover:underline underline-offset-4'> create a new account</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
