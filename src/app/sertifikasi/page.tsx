'use client'
import { getPeserta } from '@/app/api/peserta'
import React from 'react'
import { createSkema, getSkema } from '../api/skema'
import { Icon } from '@iconify/react/dist/iconify.js'

const SertifikasiPages = () => {
  const [data, setData] = React.useState([])

  const [nama, setNama] = React.useState('')
  const [jenis, setJenis] = React.useState('')
  const [jumlah, setJumlah] = React.useState('')

  const [addToggle, setAddToggle] = React.useState(false)
  const [editToggle, setEditToggle] = React.useState(false)
  const [detailToggle, setDetailToggle] = React.useState(false)

  React.useEffect(() => {
    // axios.get('http://localhost:8000/api/skemas')
    // .then((res)=>{
    //   setData(res.data.data)
    // })
    // handleGet()
    handleGet()
  }, [])

  function handleGet() {
    getSkema()
    .then((res)=>{
      console.log(res.data)
      setData(res.data)
    })
  }

  function handleGetBySearch(key:string) {
    getPeserta(undefined, key)
    .then((res)=>{
      console.log(res.data)
      // setData(res.data)
    })
  }

  function handleGetById(id:string) {
    getSkema(id)
    .then((res)=>{
      console.log(res.data)
      // setData(res.data)
    })
  }

  function handleOpenAdd() {
    setAddToggle(true)
  }

  function handleSubmit() {
    const x = {
      Nm_skema: nama,
      Jenis: jenis,
      Jml_unit: jumlah
    }
    console.log(x)
    createSkema( {
      Nm_skema: nama,
      Jenis: jenis,
      Jml_unit: jumlah
    }).then(() => {
      handleGet()
      setAddToggle(false)
      setDetailToggle(false)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white w-full container min-h-[50vh] p-4 rounded-lg text-black flex flex-col gap-5">
        <div className="flex justify-between text-sm">
          <p className="text-xl font-medium opacity-70">Data Peserta</p>
            
          <div className="flex gap-3">
            <input placeholder="Cari Peserta" className="p-2 border border-black rounded-md">

            </input>
            <button
              type="button"
              className="p-2 border border-green-600 text-green-600 hover:bg-green-300 rounded-md bg-green-200"
              onClick={handleOpenAdd}
            >
              Tambah Skema
            </button>
          </div>
        </div>

        <div className="">
          {data?.map((_, i) => {
            const { _id, Kd_skema, Nm_skema, Jenis, Jml_unit } = _
            return (
              <div key={i} className="flex justify-between items-center">
                {_}
                <div className=" ">
                  <h2 className="text-xl flex font-medium">
                    {Nm_skema}
                  </h2>
                  <p className="">#{Kd_skema}</p>
                  <p className="text-sm">{Jenis}</p>
                  <p className="text-sm">{Jml_unit}</p>
                </div>
                <button
                  type="button"
                  className="text-sm text-blue-500"
                  onClick={() => handleGetById(_id)}
                >
                  Detail Peserta
                </button>
              </div>
            )
          })}
        </div>

      {
        addToggle && (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/30"
          >
            <div className="bg-white w-1/2 p-4 rounded-md">
              <div className=" flex flex-col gap-3">
                <span>Nama</span>
                <input
                  type="text"
                  placeholder="nama"
                  className="border p-2 rounded-md"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
                <span>Jenis Klaster</span>
                <select
                  value={jenis}
                  onChange={(e) => setJenis(e.target.value)}
                  className="border p-2 rounded-md"
                  name=""
                  id=""
                >
                  <option value="Klaster">Klaster</option>
                  <option value="KKNI">KKNI</option>
                </select>
                <span>Jumlah Unit</span>
                <input
                  type="text"
                  placeholder="Jumlah Unit"
                  className="border p-2 rounded-md"
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setAddToggle(false)}
                  type="button"
                  className="p-1 px-3 text-gray-500"
                >
                  close
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="border p-1 px-3 rounded-md bg-blue-200 border-blue-600 text-blue-600 hover:bg-blue-300"
                >
                  save
                </button>
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default SertifikasiPages