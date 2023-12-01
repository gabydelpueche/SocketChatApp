import { useContext } from "react"
import AuthContext from "../context/AuthContext.jsx"

export default function Register() {
  const {registerInfo, updateRegInfo, registerUser, registerError, registerLoading} = useContext(AuthContext)

  const detectChange = (e) => {
    updateRegInfo({...registerInfo, [e.target.name]: e.target.value})
  }

  return (
    <>
      <div className="w-screen h-auto mt-40">
        <form onSubmit={registerUser} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input onChange={detectChange} type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          <div className="mb-5">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create email</label>
            <input onChange={detectChange} type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
          </div>

          <div className="mb-5">
            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Create password</label>
            <input onChange={detectChange} type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {registerLoading ? "Creating your account" : "Register"}
          </button>
        </form>

        {registerError?.error && (
          <div class="p-4 mb-4 text-sm text-red-800 text-center rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">Error ocurred!</span> {registerError?.message}
          </div>
        )}

      </div>
    </>
  )
}