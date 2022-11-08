import Link from 'next/link';
import Input from './Input';

function SignupIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70 m-auto group-hover:opacity-100">
      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
    </svg>
  );
}

export default function Signup(): JSX.Element {
  return (
    <div className="bg-white m-auto rounded-xl p-12 shadow w-96">
      <div>
        <form>
          <div className='flex space-x-4 mb-4'>
            <Input name="First name" />
            <Input name="Last name" />
          </div>
          <div className='space-y-4'>
            <Input name="Username" />
            <Input name="Password" type="password"/>
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
            <span className='font-bold group-hover:underline underline-offset-4'> login to an existing account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
