import { product } from "@prisma/client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { trpc } from "../utils/trpc";

interface AddItemModalProps{
    setModalOpen2: Dispatch<SetStateAction<boolean>>
    setProducts2: Dispatch<SetStateAction<product[]>>
}

const EditItemModal: FC<AddItemModalProps>= ({setModalOpen2, setProducts2}) => {
    const [input1, setInput1] = useState<string>('')
    const [input2, setInput2] = useState<string>('')
    const [input3, setInput3] = useState<string>('')
    const [input4, setInput4] = useState<string>('')
    const [input5, setInput5] = useState<number>(0)
    const [input6, setInput6] = useState<string>('')
    const [input7, setInput7] = useState<number>(0)
    const [input8, setInput8] = useState<number>(0)
    const [input9, setInput9] = useState<number>(0)
    const [input10, setInput10] = useState<string>('')
    
    
    const {mutate: updateProduct} = trpc.product.editProduct.useMutation({
        onSuccess(product){
            setProducts2((prev) => [...prev,product])
        },
    });
    
    return (<div className="absolute inset-0 bg-black/75 justify-center">
    <div className="space-y-4 p-3 bg-white">
        <h3 className="text-x1 font-semibold">Name of product</h3>
        <input
            type="text"
            value={input1}
            onChange={(e)=> setInput1(e.target.value)}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Slug</h3>
        <input
            type="text"
            value={input2}
            onChange={(e)=> setInput2(e.target.value)}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Category</h3>
        <input
            type="text"
            value={input3}
            onChange={(e)=> setInput3(e.target.value)}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Image Adress</h3>
        <input
            type="text"
            value={input4}
            onChange={(e)=> setInput4(e.target.value)}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Price(number)</h3>
        <input
            type="number"
            value={input5}
            onChange={(e)=> setInput5(parseInt(e.target.value))}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Brand</h3>
        <input
            type="text"
            value={input6}
            onChange={(e)=> setInput6(e.target.value)}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Rating(number)</h3>
        <input
            type="number"
            value={input7}
            onChange={(e)=> setInput7(parseInt(e.target.value))}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Reviews(number)</h3>
        <input
            type="number"
            value={input8}
            onChange={(e)=> setInput8(parseInt(e.target.value))}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Stock(number)</h3>
        <input
            type="number"
            value={input9}
            onChange={(e)=> setInput9(parseInt(e.target.value))}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        />
        <h3 className="text-x1 font-semibold">Description</h3>
        <input
            type="text"
            value={input10}
            onChange={(e)=> setInput10(e.target.value)}
            className='w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet'
        /> 
        <div className="grid grid-cols-2 gap-8">
            <button
                type='button'
                onClick={()=>setModalOpen2(false)}
                className="rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600">
                Cancel
            </button>
            <button
                type='button'
                onClick={()=> {
                    updateProduct({
                        name: input1,
                        slug: input2,
                        category: input3,
                        image: input4,
                        price: input5,
                        brand: input6,
                        rating: input7,
                        numReviews: input8,
                        countInStock: input9,
                        description: input10
                    })
                    setModalOpen2(false)
                }}
                className="rounded-md bg-violet-500 p-1 text-xs text-white transition hover:bg-violet-600">
                Update
            </button>
        </div>
    </div>
</div>)
}

export default EditItemModal