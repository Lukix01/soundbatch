import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import Input from './Input';

function SignupIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 m-auto group-hover:opacity-100">
      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
    </svg>
  );
}

export default function Signup(): JSX.Element {
  const [ firstName, setFirstName ] = useState<string>('');
  const [ lastName, setLastName ] = useState<string>('');
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const [ usernameError, setUsernameError ] = useState<boolean>(false);

  const router: NextRouter = useRouter();

  const Register: (event: any) => Promise<void> = async (event: any): Promise<void> => {
    event.preventDefault();

    if (firstName && lastName && username && password) {
      try {
        await axios.post('/api/accounts', {
          firstName,
          lastName,
          username,
          password,
        });
        router.push('/login');
      } catch (error) {
        console.error(error);
        setUsernameError(true);
      }
    }
  };

  return (
    <div className="bg-white m-auto rounded-xl p-12 shadow w-96">
      <div>
        <form onSubmit={Register}>
          <div className='flex space-x-4 mb-4'>
            <Input name="First name" value={firstName} onchange={(event: any): void => setFirstName(event.target.value)}/>
            <Input name="Last name" value={lastName} onchange={(event: any): void => setLastName(event.target.value)} />
          </div>
          <div>
            <Input name="Username" value={username} onchange={(event: any): void => setUsername(event.target.value)}/>
            {usernameError && <div className='text-red-500 text-sm mt-1'>Username already exists.</div> }
            <div className='mt-4'>
              <Input name="Password" type="password" value={password} onchange={(event: any): void => setPassword(event.target.value)}/>
            </div>
          </div>
          <button className='bg-gray-500 p-2.5 text-white rounded-lg w-full mt-8 flex hover:bg-gray-600 transition group'>
            <div className='flex m-auto'>
              <SignupIcon />
              <div className='ml-2'>Sign Up</div>
            </div>
          </button>
        </form>
        <div className='text-sm m-auto mt-2 text-gray-500 group cursor-pointer w-max'>Or
          <Link href="/login">
            <span className='font-bold group-hover:underline'> login to an existing account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
