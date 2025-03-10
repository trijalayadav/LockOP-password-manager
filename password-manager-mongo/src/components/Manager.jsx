import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const Passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        // let passwordArray
        console.log(passwords);
        setpasswordArray(passwords)

    }
    useEffect(() => {
        getPasswords()

    }, [])


    const ShowPassword = () => {
        // console.log(ref.current.src);
        if (ref.current.src.includes("icons/hide.png")) {
            Passwordref.current.type = "text"
            ref.current.src = "icons/view.png"
        } else {
            Passwordref.current.type = "password"
            ref.current.src = "icons/hide.png"
        }
    }
    const SavePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            // toast('Password not saved!')
        }

    }
    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-type": "application/json" }, body: JSON.stringify({ id }) })
            console.log("deleting password with id: ", id);
            toast('Password deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            console.log("not deleting password with id: ", id);
        }
    }
    const editPassword = async (id) => {
        console.log("editing password with id: ", id);
        setform({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-type": "application/json" }, body: JSON.stringify({ id: form.id }) })
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const copytext = (e) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(e)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className=" mycontainer text-white">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Lock</span>
                    <span className='text-green-500'>/OP&gt;</span>
                </h1>
                <p className='text-green-500 text-center'>Your own password manager</p>
                <div className="text flex flex-col p-4 text-black space-y-3 items-center">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500 outline-green-500 w-full px-4 py-1' type="url" id='site' name="site" placeholder='Enter website URL' />
                    <div className="flex flex-col sm:flex-row w-full sm:space-x-3 justify-between gap-3">
                        <div className='w-full'>
                            <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 outline-green-500 w-full px-4 py-1' type="text" id='username' name="username" placeholder='Enter your username' />
                        </div>
                        <div className="password relative sm:w-full sm:flex sm:items-center justify-center flex-row ">
                            <input ref={Passwordref} value={form.password} onChange={handleChange} className='rounded-full border border-green-500 outline-green-500 w-full px-4 py-1 h-full' type="password" id='password' name="password" placeholder='Enter your password' />
                            <div className="absolute right-0 bottom-1"><img ref={ref} className='w-8 cursor-pointer px-1' src="icons/hide.png" alt="" onClick={ShowPassword} /></div>
                        </div>
                    </div>
                    <button onClick={SavePassword} className='flex justify-center items-center text-white bg-green-500 rounded-full px-4 py-1 w-fit hover:bg-green-400 space-x-2 border-2 border-green-800'>
                        <img className='' src="icons/add.svg" alt="" />
                        <span>Save password</span>
                    </button>
                </div>
            </div>
            <div className="passwords text-white py-4">
                <h2 className='text-xl font-bold text-center'>Your passwords</h2>
                {passwordArray.length == 0 && <div>No passwords to show</div>}
                {
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full rounded-sm overflow-hidden">
                            <thead className='bg-green-600'>
                                <tr>
                                    <th className='text-center py-2'>Site URL</th>
                                    <th className='text-center py-2'>Username</th>
                                    <th className='text-center py-2'>Passwords</th>
                                    <th className='text-center py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-slate-200 text-black w-full'>
                                {passwordArray.map((item) => {
                                    return <tr key={item.id}>
                                        <td className='text-center w-32 border border-white'>
                                            <div className='flex justify-between items-center px-5'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <img className='w-4 cursor-pointer' src="icons/copy.png" alt="" onClick={() => { copytext(item.site) }} />
                                            </div>
                                        </td>
                                        <td className='text-center w-32 border border-white'><div className='flex justify-between items-center px-5'><span>{item.username}</span> <img className='w-4 cursor-pointer' src="icons/copy.png" alt="" onClick={() => { copytext(item.username) }} /></div></td>
                                        <td className='text-center w-32 border border-white'><div className='flex justify-between items-center px-5'><span>{item.password}</span> <img className='w-4 cursor-pointer' src="icons/copy.png" alt="" onClick={() => { copytext(item.password) }} /></div></td>
                                        <td className='text-center w-32 border border-white'>
                                            <div className='flex px-5 space-x-1 justify-center'>
                                                <img className='w-4 cursor-pointer' src="icons/delete.png" alt="" onClick={() => { deletePassword(item.id) }} />
                                                <img className='w-4 cursor-pointer' src="icons/edit.png" alt="" onClick={() => { editPassword(item.id) }} />
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    )
}

export default Manager