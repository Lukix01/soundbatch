import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export default function CookiesAlert(): JSX.Element | null {
  const [ cookies, setCookie ] = useCookies();

  const [ cookiesAllowed, setCookiesAllowed ] = useState(false);

  function Done(): void {
    setCookie('cookies', true);
  }

  useEffect((): void => {
    if (cookies.cookies) {
      setCookiesAllowed(true);
    }
  }, [ cookies.cookies ]);

  if (cookiesAllowed) {
    return null;
  }

  return (
    <div className="bg-black bg-opacity-50 rounded-xl p-6 w-96 absolute bottom-10 right-10 z-20 ">
      <div className="text-white m-auto">This website is using cookies to give you the best experience of using it.</div>
      <input onClick={Done} type="submit" value="Done" className="py-1 px-6 mt-2 rounded-md cursor-pointer border border-opacity-50 text-white border-white hover:bg-white hover:text-black transition"/>
    </div>
  );
}

