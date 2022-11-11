import { userSchema } from '@prisma/client'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { trpc } from "../utils/trpc"

interface productProps{
    setModalOpen: Dispatch<SetStateAction<boolean>>
    setItems: Dispatch<SetStateAction<userSchema[]>>
}

const ProductModal: FC<productProps> = ({setModalOpen, setItems}) => {
    const [input, setInput] = useState<string>('')
    const [input2, setInput2] = useState<string>('')
    const [input3, setInput3] = useState<string>('')
 
    
    const { mutate: addItem} = trpc.userSchema.addProduct.useMutation({
        onSuccess(userSchema){
            setItems((prev) => [...prev,userSchema])
        }
    
    })
    
    return <div className="absolute inset-0 bg-black/75 justify-center">Registro
        <div className="space-y-4 p-3 bg-white">
            <h3 className="text-x1 font-semibold">Correo</h3>
            <input
                type="text"
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
            />
            <h3 className="text-x1 font-semibold">Nombre</h3>
            <input
                type="text"
                value={input2}
                onChange={(e)=> setInput2(e.target.value)}
                className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
            />
            <h3 className="text-x1 font-semibold">Contraseña</h3>
            <input
                type="text"
                value={input3}
                onChange={(e)=> setInput3(e.target.value)}
                className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
            />
          
           
            <div className="grid grid-cols-2 gap-8">
                <button
                    type='button'
                    onClick={()=>setModalOpen(false)}
                    className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600">
                    Cancel
                </button>
                <button
                    type='button'
                    onClick={()=> {
                        addItem({
                            email: input,
                            name: input2,
                            password: input3,
                            isAdmin: false
                        })
                        setModalOpen(false)
                    }}
                    className="rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600">
                    Add
                </button>
            </div>
        </div>
    </div>
}

export default ProductModal