'use client'
import { getPeserta } from '@/app/api/peserta'
import React from 'react'
import { createSkema, deleteSkema, getSkema, updateSkema } from '../api/skema'
import { Icon } from '@iconify/react/dist/iconify.js'

const SertifikasiPages = () => {
  const [data, setData] = React.useState([])
  const [selectedData, setselectedData]: any = React.useState();

  const [id, setId] = React.useState('')
  const [kSkema, setKSkema] = React.useState('')
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
      const { _id, Kd_skema, Nm_skema, Jenis, Jml_unit } = res.data
      setDetailToggle(true)
      setId(_id)
      setKSkema(Kd_skema)
      setNama(Nm_skema)
      setJenis(Jenis)
      setJumlah(Jml_unit)
      console.log(res.data)
      setselectedData(res.data)
    })
  }

  function handleSaveEdit() {
    updateSkema(id, {
      Nm_skema: nama,
      Jenis: jenis,
      Jml_unit: jumlah
    }).then(() => {
      handleGet()
      setEditToggle(false)
      setDetailToggle(false)
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

  function handleDelete(id:string){
    deleteSkema(id)
    .then(()=>{
      handleGet()
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white w-full container min-h-[50vh] p-4 rounded-lg text-black flex flex-col gap-5">
        <div className="flex justify-between text-sm">
          <p className="text-xl font-medium opacity-70">Data Skema</p>
          <div className="flex gap-3">

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
          {data?.map((_:any, i) => {
            const { _id, Kd_skema, Nm_skema, Jenis, Jml_unit } = _
            return (
              <div key={i} className="flex justify-between items-center">
                <div className=" ">
                  <h2 className="text-xl flex font-medium">
                    {Nm_skema}
                  </h2>
                  <p className="">#{Kd_skema}</p>
                  <p className="text-sm">{Jenis}</p>
                  <p className="text-sm">{Jml_unit}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="bg-blue-200 rounded-md border-blue-600  p-2 text-sm text-blue-500"
                    onClick={() => handleGetById(_id)}
                  >
                    <Icon icon="mdi:eye-outline" className="text-[#3e8fda]" />
                  </button>
                  <button
                    type="button"
                    className="bg-red-200 rounded-md border-red-600  p-2 text-sm text-red-500"
                    onClick={() => handleDelete(_?._id)}
                  >
                    <Icon icon="bx:trash"  className="text-[#da3e3e]" />
                  </button>
                </div>
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

      {
        detailToggle && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30"
          >
            <div className="bg-white w-1/2 p-4 rounded-md">
              {editToggle
                ? (
                  <div className="">
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
                  </div>
                )
                : (
                  <div className="flex flex-col gap-3">
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
                  </div>
                )
              }
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setDetailToggle(false)}
                  type="button"
                  className="p-1 px-3 text-gray-500"
                >
                  close
                </button>

                {editToggle
                  ?
                  <button
                    onClick={handleSaveEdit}
                    type="button"
                    className="border p-1 px-3 rounded-md bg-blue-200 border-blue-600 text-blue-600 hover:bg-blue-300"
                  >
                    Save
                  </button>
                  :
                  <button
                    onClick={() => setEditToggle(true)}
                    type="button"
                    className="border p-1 px-3 rounded-md bg-blue-200 border-blue-600 text-blue-600 hover:bg-blue-300"
                  >
                    Edit
                  </button>
                }
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