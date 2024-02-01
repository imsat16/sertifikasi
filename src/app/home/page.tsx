'use client'
import { createSkema, deleteSkema, getSkema } from '@/app/api/skema'
import React, { useState } from 'react'

type Skema = {
  Nm_skema? : string;
  Jenis?: string;
  Jml_unit?: string;
}

const HomePages = () => {
  const [data, setData] = useState([])
  const [name, setName] = useState("")
  const [jenis, setJenis] = useState("")
  const [jumlah, setJumlah] = useState("")

  const [selectedItem, setSelectedItem] = useState({})
  const [detailData, setDetailData] = useState({})

  React.useEffect(() => {
    // axios.get('http://localhost:8000/api/skemas')
    // .then((res)=>{
    //   setData(res.data.data)
    // })
    handleGet()
  }, [])

  function handleGet() {
    getSkema()
    .then((res)=>{
      console.log(res.data)
      setData(res.data)
    })
  }

  function handleDetail(id:String) {
    getSkema(id)
    .then((res)=>{
      setDetailData(res.data)
    })
  }

  function handleDeleteItem(id:any) {
   deleteSkema(id)
   .then(()=>{
    handleGet()
  })
  }

  function handleSubmit(e:any) {
    e.preventDefault()
    createSkema({
      Jenis: jenis,
      Nm_skema: name,
      Jml_unit: jumlah
    }).then(()=>{
      handleGet()
    })
  }
  
  return (
    <div>
      <div>
        {data.map((_,i)=>{
          const {_id, Kd_skema, Nm_skema, Jenis, Jml_unit} = _
          return (
            <div key={i} className="">
              <p onClick={()=>handleDetail(_id)}>{_id}</p>
              {Kd_skema}
              {Nm_skema}
              {Jenis}
              {Jml_unit}
              <button onClick={()=>handleDeleteItem(_id)} type="button">delete</button>
            </div>
          )
        })}
      </div>
      <div >
        <form action="" className="flex flex-col gap-2 text-black">
          <input 
            type="text" 
            placeholder='Name'
            onChange={(e)=>setName(e.target.value)}
          />
          <select onChange={(e)=>setJenis(e.target.value)} name="" id="">
            <option selected disabled value="">Select Jenis</option>
            <option value="Klaster">Klaster</option>
            <option value="KKNI">KKNI</option>
          </select>
          <input 
            type="text" 
            placeholder='Jumlah'
            onChange={(e)=>setJumlah(e.target.value)}
          />
          <button className='text-white' onClick={handleSubmit}>Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default HomePages