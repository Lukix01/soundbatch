import axios from 'axios';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { createRef, RefObject, useState } from 'react';
import { useCookies } from 'react-cookie';
import { LockOpenIcon } from '@heroicons/react/24/solid';
import ReCAPTCHA from 'react-google-recaptcha';
import Input from './Input';

export default function Login(): JSX.Element {
  const [ _, setCookie ] = useCookies();
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ loginError, setLoginError ] = useState(false);
  const [ recaptchaValid, setRecaptchaValid ] = useState(false);

  const router: NextRouter = useRouter();

  const recaptchaReference: RefObject<any> = createRef();

  const onReCAPTCHAChange: (captchaCode: string | null) => void = (captchaCode: string | null): void => {
    if (!captchaCode) {
      return;
    }

    setRecaptchaValid(true);

    recaptchaReference.current.reset();
  };

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
        if (!recaptchaValid) {
          recaptchaReference.current.execute();
        } else {
          setCookie('session', { username: response.data.username, firstName: response.data.firstName, lastName: response.data.lastName }, { path: '/' });
          router.push('/library');
        }
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
            <LockOpenIcon className='w-4 opacity-70 group-hover:opacity-100 '/>
            <div className='ml-2 m-auto'>Sign In</div>
          </div>
        </button>
        <div className='mt-2'>
          <ReCAPTCHA
            ref={recaptchaReference}
            size='invisible'
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
            onChange={onReCAPTCHAChange}
          />
        </div>
        <div className='text-sm m-auto mt-2 text-gray-500 group cursor-pointer w-max'>Or
          <Link href="/signup">
            <span className='font-bold group-hover:underline underline-offset-4'> create a new account</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
