import Input from './Input';

function UnlockIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 m-auto group-hover:opacity-100">
      <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
    </svg>);
}

export default function Login(): JSX.Element {
  return (
    <div className="bg-white m-auto rounded-xl p-12 shadow w-96">
      <div className=''>
        <div className='space-y-4'>
          <Input name="Login"/>
          <Input name="Password" type="password" />
        </div>
        <button className='bg-gray-500 p-2.5 text-white rounded-lg w-full mt-8 flex hover:bg-gray-600 transition group'>
          <div className='flex m-auto'>
            <UnlockIcon />
            <div className='ml-2'>Sign In</div>
          </div>
        </button>
        <div className='text-sm m-auto mt-2 text-gray-500 group cursor-pointer w-max'>Or
          <span className='font-bold group-hover:underline underline-offset-4'> create a new account</span>
        </div>
      </div>
    </div>
  );
}
