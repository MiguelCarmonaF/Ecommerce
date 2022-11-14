
import React, { useState } from "react";
import Layout from "../comp/layout";
import {useForm} from "react-hook-form";
import {trpc} from "../utils/trpc"
import ProductModal from "../comp/ProductModal"
import { userSchema } from "@prisma/client";

export default function LogInScreen() {
    
    type FormValues={
        email: string;
        password: string;
    };

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<FormValues>();

    const submitHandler = ({email,password}:{
        email: String;
        password: String;
    })=>{
        console.log(email,password)
    }
    

    const [items, setItems] = useState<userSchema[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
   
    const {} = trpc.userSchema.addMail.useMutation({
        onSuccess: (product) => {
            setItems((prev) => [...prev,product])
        }
   })
    


    return (
       <>
           {modalOpen && <ProductModal setModalOpen={setModalOpen} setItems={function (value: React.SetStateAction<userSchema[]>): void {
                throw new Error("Function not implemented.");
            } }/>}
            <Layout title="Login">
                
                <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                    <h1 className="mb-4 text-xl">Login</h1>
                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <input 
                            {...register("email",{required: "Please enter a email", pattern:{value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/i,
                            message: "please enter a valid email"}})} 
                            type="email" 
                            className="w-full rounded border p-2 outline-none ring-indigo-300 focus:ring" 
                            id="email" 
                            autoFocus>
                        </input>
                        {errors.email && (<div className="text-red-500">{errors.email.message}</div>) }
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            {...register("password",{required: "Please enter password", minLength:{value: 6,
                            message: "Password is more than 5 chars"}})}
                            type="password"
                            className="w-full rounded border p-2 outline-none ring-indigo-300 focus:ring" id="password" 
                            autoFocus>
                        </input>
                        {errors.password && <div className="text-red-500">{errors.password.message}</div> }
                    </div>
                    <div className="mb-4">
                        <button className="rounded bg-amber-300 w-full py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500">Login</button>
                    </div>
                    <div className="mb-4">
                        ¿Don&apos;t have an account? &nbsp;
                        <button 
                            type="button" 
                            onClick={()=>setModalOpen(true)}
                            className="bg-violet-500 text-white text-sm p-2 rounded-md transition hover:bg-violet-600">
                            Registrar correo
                        </button>
                    </div>
                </form>
            </Layout>
        </>
    )
}