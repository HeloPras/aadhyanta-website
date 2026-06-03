'use client'


import { zodResolver } from '@hookform/resolvers/zod'
import {  SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'


const TestForm = () => {

  type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    "name":z.string().nonempty(),
    "email":z.email().nonempty().min(1)
})

const {register, handleSubmit,control,formState:{errors}} = useForm({
    resolver: zodResolver(formSchema)
})


const onSubmit:SubmitHandler<FormData> = (data)=>{
    console.log(data)
}



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Name</label>
        <input type="text" id='name'  placeholder='Enter Your Name' {...register("name")} />
        {errors.name && "Name is required"}

        <label htmlFor='email'>Email</label>
        <input type="email" id='email' placeholder='Enter Your Email' {...register("email")} />
        {errors.email && "Email is required"}

        <button type='submit'>Submit</button>
      </form>

    </>
  )
}

export default TestForm