"use client"
import { supabase } from "@/utils/database";
import { useEffect, useState } from "react";

export default function Logo({ position }: { position: string }) {
  const [userData, setUserData] = useState<any>()
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
    
  useEffect(() => {
    async function getSession() {
      const {data, error } = await supabase.auth.getSession()

      if (error) {
        console.log(error)
        window.location.href = '/login'
      }
      if (data.session === null) {
        console.log(data)
        window.location.href = '/login'
        
      } else {
        const user = await supabase.from("profiles").select("*").eq("auth_id", data.session.user.id).single();
        setUserData(user.data)
      }
    }

    getSession()
  }, []);

  function getDropdown() {
    if (dropdownVisible === true) {
      setDropdownVisible(false)
    }
    if (dropdownVisible === false) {
      setDropdownVisible(true)
    }
  } 

  async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    } else {
      window.location.reload()
    }
  }
  
    return (
        <>
        {position === "top" && (
            <div className="w-full fixed z-50">
            <div className="absolute inset-x-0 bottom-5 w-full h-3/4 bg-gradient-to-b from-black to-transparent -z-10 mb-0.5"></div>
            <div className="z-50 w-full flex flex-cols-2 justify-between px-4 py-2">
              <div className="bg-white/10 backdrop-blur-3xl rounded-xl w-fit p-1 gap-2 h-[48px] justify-center items-center flex flex-cols mt-3 mr-5 cursor-pointer" onClick={getDropdown}>
                <img className="w-full h-full rounded-xl" src={userData?.avatar_url || '/favicon.ico'}/>
                <p className="text-sm mr-1">{userData?.full_name || 'Loading...'}</p>
              </div>
              <div className="flex flex-cols-2 gap-1">
              <a href="/" className="flex flex-col justify-center items-center text-center"><svg width="48" height="48" viewBox="0 0 234 262" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M135.513 62.3751C147.067 58.1154 158.525 55.8833 170.37 56.3098C187.624 56.6716 200.645 64.798 211.496 77.4453C223.714 91.6854 230.765 108.314 232.816 127.159C233.997 138.015 233.579 148.867 232.096 159.712C230.079 174.461 226.723 188.814 220.711 202.377C215.539 214.046 210.122 225.671 201.937 235.467C191.702 247.715 179.377 256.934 163.96 261.07C158.673 262.489 153.394 262.284 148.174 260.46C140.316 257.715 132.336 255.377 124.382 252.951C120.685 251.823 117.075 251.778 113.381 252.779C103.715 255.397 94.1003 258.262 84.352 260.501C70.7036 263.635 58.4583 260.589 47.8815 250.749C31.5163 235.525 20.0427 216.888 11.6532 196.056C6.3285 182.835 2.38509 169.159 1.11337 154.889C-1.00264 131.144 2.09256 108.292 14.5403 87.6696C21.3562 76.3778 30.1515 66.9244 41.8262 60.7726C48.9133 57.0381 56.5469 55.9969 64.3976 56.211C77.8502 56.5777 90.9126 59.6333 104.022 62.364C104.929 62.553 105.843 62.7072 106.758 62.8502C106.882 62.8695 107.029 62.7277 107.387 62.5514C106.487 59.0799 104.779 55.9439 102.981 52.9121C98.641 45.5932 93.7666 38.6507 88.6491 31.8884C87.094 29.8335 85.2169 28.8951 82.6445 28.9401C77.21 29.0352 75.1317 25.9196 76.8318 20.5179C78.6004 14.8982 83.636 13.0338 88.4334 16.1936C90.0258 17.2423 91.34 18.575 92.5448 20.0585C97.7514 26.4697 102.077 33.4992 106.113 40.7275C108.181 44.4316 109.465 48.471 110.632 52.5545C110.929 53.5964 111.012 54.7785 112.093 55.6003C113.53 54.3577 113.268 52.5027 113.421 50.9983C114.94 36.0447 122.093 24.6043 133.415 15.5219C141.19 9.28455 149.27 3.72894 158.812 0.812341C159.702 0.54056 160.606 0.301193 161.517 0.130463C165.002 -0.521938 167.028 1.30135 167.459 4.9527C169.472 22.037 162.663 35.4978 151.473 47.2382C147.213 51.707 142.602 55.7337 137.741 59.4719C136.959 60.073 136.013 60.546 135.513 62.3751Z" fill="#fff"></path></svg></a>
              <h1 className="text-6xl font-medium tracking-tight text-white max-w-4xl">tv</h1>
              </div>
            </div>
            </div>
        )}
        {position === "bottom" && (
            <div className="w-full fixed bottom-0 z-50">
            <div className="absolute inset-x-0 bottom-0 w-full h-[120px] bg-gradient-to-t from-black to-transparent -z-10"></div>
            <div className="z-50 flex flex-cols-2 gap-1 justify-end mx-6 my-4">
            <a href="/" className="flex flex-col justify-center items-center text-center"><svg width="48" height="48" viewBox="0 0 234 262" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M135.513 62.3751C147.067 58.1154 158.525 55.8833 170.37 56.3098C187.624 56.6716 200.645 64.798 211.496 77.4453C223.714 91.6854 230.765 108.314 232.816 127.159C233.997 138.015 233.579 148.867 232.096 159.712C230.079 174.461 226.723 188.814 220.711 202.377C215.539 214.046 210.122 225.671 201.937 235.467C191.702 247.715 179.377 256.934 163.96 261.07C158.673 262.489 153.394 262.284 148.174 260.46C140.316 257.715 132.336 255.377 124.382 252.951C120.685 251.823 117.075 251.778 113.381 252.779C103.715 255.397 94.1003 258.262 84.352 260.501C70.7036 263.635 58.4583 260.589 47.8815 250.749C31.5163 235.525 20.0427 216.888 11.6532 196.056C6.3285 182.835 2.38509 169.159 1.11337 154.889C-1.00264 131.144 2.09256 108.292 14.5403 87.6696C21.3562 76.3778 30.1515 66.9244 41.8262 60.7726C48.9133 57.0381 56.5469 55.9969 64.3976 56.211C77.8502 56.5777 90.9126 59.6333 104.022 62.364C104.929 62.553 105.843 62.7072 106.758 62.8502C106.882 62.8695 107.029 62.7277 107.387 62.5514C106.487 59.0799 104.779 55.9439 102.981 52.9121C98.641 45.5932 93.7666 38.6507 88.6491 31.8884C87.094 29.8335 85.2169 28.8951 82.6445 28.9401C77.21 29.0352 75.1317 25.9196 76.8318 20.5179C78.6004 14.8982 83.636 13.0338 88.4334 16.1936C90.0258 17.2423 91.34 18.575 92.5448 20.0585C97.7514 26.4697 102.077 33.4992 106.113 40.7275C108.181 44.4316 109.465 48.471 110.632 52.5545C110.929 53.5964 111.012 54.7785 112.093 55.6003C113.53 54.3577 113.268 52.5027 113.421 50.9983C114.94 36.0447 122.093 24.6043 133.415 15.5219C141.19 9.28455 149.27 3.72894 158.812 0.812341C159.702 0.54056 160.606 0.301193 161.517 0.130463C165.002 -0.521938 167.028 1.30135 167.459 4.9527C169.472 22.037 162.663 35.4978 151.473 47.2382C147.213 51.707 142.602 55.7337 137.741 59.4719C136.959 60.073 136.013 60.546 135.513 62.3751Z" fill="#fff"></path></svg></a>
            <h1 className="text-6xl font-medium tracking-tight text-white max-w-4xl">tv</h1>
            </div>
            </div>
        )}

        {/* dropdown */}
        {dropdownVisible === true && (
          <div className="bg-black/20 backdrop-blur-3xl rounded-xl max-md:rounded-t-xl md:w-52 w-full h-[90svh] md:h-fit p-4 fixed z-50 md:top-5 top-28 md:left-44 shadow-3xl">
            <div className="flex flex-col gap-2 max-md:gap-4">
            <a href="/upload" className="bg-white/20 backdrop-blur-xl border border-white/20 w-full rounded-xl p-4">Upload a video</a>
            <a href="/settings" className="bg-black/10 backdrop-blur-xl border border-white/20 w-full rounded-xl p-4">Settings</a>
            <a href="https://github.com/iahispano" target="_blank" rel="notarget" className="bg-black/10 backdrop-blur-xl border border-white/20 w-full rounded-xl p-4">Report a bug</a>
            <button onClick={logout} className="bg-red-500/10 backdrop-blur-xl border border-white/20 w-full rounded-xl p-4 text-left">Logout</button>
            </div>

          </div>
        )}
        </>
    )
}