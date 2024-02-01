'use client'

import React from "react";
import { createPeserta, deletePeserta, getPeserta, updatePeserta } from "./api/peserta";
import { Icon } from '@iconify/react';
import { getSkema } from "./api/skema";


export default function Home() {
  const [data, setData] = React.useState([])
  const [schemeData, setschemeData] = React.useState([])
  const [selectedData, setselectedData]: any = React.useState();
  
  const [keyName, setKeyName] = React.useState('')

  const [id, setId] = React.useState('')
  const [nama, setNama] = React.useState('')
  const [jenis, setJenis] = React.useState('')
  const [totalUnit, setTotalUnit] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [kdSchema, setKdSchema] = React.useState('')

  const [addToggle, setAddToggle] = React.useState(false)
  const [editToggle, setEditToggle] = React.useState(false)
  const [detailToggle, setDetailToggle] = React.useState(false)

  React.useEffect(() => {
    handleGet()
    handleScheme()
  }, [])

  function handleGet() {
    getPeserta()
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
  }

  function handleScheme() {
    getSkema()
      .then((res) => {
        console.log(res.data)
        setschemeData(res.data)
      })
  }

  function handleOpenAdd() {
    setAddToggle(true)
  }

  function handleOpenDetail(id: string) {
    getPeserta(id, undefined)
      .then((res) => {
        const { _id, Kd_skema, Nm_peserta, Jekel, Alamat, No_hp } = res.data
        setId(_id)
        setDetailToggle(true)
        setselectedData(res.data)
        setNama(Nm_peserta)
        setJenis(Kd_skema.Jenis)
        setKdSchema(Kd_skema._id)
        setTotalUnit(Kd_skema.Jml_unit)
        setGender(Jekel)
        setAddress(Alamat)
        setPhone(No_hp)
      })
  }

  function handleSaveEdit() {
    updatePeserta(id, {
      Nm_peserta: nama,
      Jenis: jenis,
      Jml_unit: totalUnit,
      Jekel: gender,
      Alamat: address,
      No_hp: phone,
      Kd_skema: kdSchema
    }).then(() => {
      handleGet()
      setEditToggle(false)
      setDetailToggle(false)
    })
  }

  function handleDelete(id:string){
    deletePeserta(id)
    .then(()=>{
      handleGet()
    })
  }

  function handleCreatePeserta() {
    createPeserta({
      Nm_peserta: nama,
      Jenis: jenis,
      Jekel: gender,
      Alamat: address,
      No_hp: phone,
      Kd_skema: kdSchema
    }).then(() => {
      handleGet()
      setAddToggle(false)
    })
  }

  function handleSearch(key:string){
    getPeserta('', key)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white w-full container min-h-[50vh] p-4 rounded-lg text-black flex flex-col gap-5">
        <div className="flex justify-between text-sm">
          <p className="text-xl font-medium opacity-70">Data Peserta</p>
          <div className="flex gap-3">
            <input 
            onChange={(e)=>handleSearch(e.target.value)}
            placeholder="Cari Peserta" className="p-2 border border-black rounded-md">

            </input>
            <button
              type="button"
              className="p-2 border border-green-600 text-green-600 hover:bg-green-300 rounded-md bg-green-200"
              onClick={handleOpenAdd}
            >
              Tambah Peserta
            </button>
          </div>
        </div>
        <div className="">
          {data?.map((_:any, i) => {
            const { _id, Kd_skema, Nm_peserta, Jekel, Alamat, No_hp } = _
            return (
              <div key={i} className="flex justify-between items-center">
                <div className=" ">
                  <h2 className="text-xl flex font-medium">
                    {Nm_peserta}
                    {Jekel === "Pria"
                      ? <Icon
                        icon="ph:gender-male-bold"
                        className="text-[#3e8fda]"
                      />
                      : <Icon
                        icon="ph:gender-female-bold"
                        className="text-[#da3e99]"
                      />
                    }
                  </h2>
                  <p className="">#{Kd_skema}</p>
                  <p className="text-sm">{Alamat} | {No_hp}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="bg-blue-200 rounded-md border-blue-600  p-2 text-sm text-blue-500"
                    onClick={() => handleOpenDetail(_id)}
                  >
                    <Icon icon="mdi:eye-outline" className="text-[#3e8fda]" />
                  </button>
                  <button
                    type="button"
                    className="bg-red-200 rounded-md border-red-600  p-2 text-sm text-red-500"
                    onClick={() => handleDelete(_._id)}
                  >
                    <Icon icon="bx:trash"  className="text-[#da3e3e]" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {
        addToggle && (
          <div
            className="absolute w-full h-full flex items-center justify-center bg-black/30"
          >
            <div className="bg-white w-1/2 p-4 rounded-md">
              <div className="">
                <input
                  type="text"
                  placeholder="nama"
                  className="border p-2 rounded-md"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
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
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="border p-2 rounded-md"
                  name=""
                  id=""
                >
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
                
                <select
                  value={kdSchema}
                  onChange={(e) => setKdSchema(e.target.value)}
                  className="border p-2 rounded-md"
                  name=""
                  id=""
                >
                  {
                    schemeData.map((_:any, i)=>{
                      return(
                        <option 
                          key={i} 
                          value={_._id} 
                          className=""
                        >
                          {_.Nm_skema}
                        </option>
                      )
                    })
                  }
                </select>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="border p-2 rounded-md"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  placeholder="Alamat"
                  className="border p-2 rounded-md"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setAddToggle(false)}
                  type="button"
                  className="p-1 px-3 text-gray-500"
                >
                  close
                </button>
                <button
                  onClick={handleCreatePeserta}
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
            className="fixed top-0 w-full h-full flex items-center justify-center bg-black/30"
          >
            <div className="bg-white w-1/2 p-4 rounded-md">
              {editToggle
                ? (
                  <div className="">
                    <input
                      type="text"
                      placeholder="nama"
                      className="border p-2 rounded-md"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
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
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="border p-2 rounded-md"
                      name=""
                      id=""
                    >
                      <option value="Pria">Pria</option>
                      <option value="Wanita">Wanita</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="border p-2 rounded-md"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <textarea
                      placeholder="Alamat"
                      className="border p-2 rounded-md"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                )
                : (
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <h2 className="text-2xl font-medium flex">
                          {selectedData?.Nm_peserta}
                          {selectedData?.Jekel === "Pria"
                            ? <Icon
                              icon="ph:gender-male-bold"
                              className="text-[#3e8fda]"
                            />
                            : <Icon
                              icon="ph:gender-female-bold"
                              className="text-[#da3e99]"
                            />
                          }
                        </h2>
                        <p className="">
                          Phone: {selectedData?.No_hp}
                        </p>
                        <p>Alamat Peserta: {selectedData.Alamat}</p>
                      </div>
                      <h3 className="text-xl font-medium">
                        #{selectedData?.Kd_skema.Kd_skema}
                      </h3>
                    </div>
                    <div className="flex flex-col">
                      <p className="">
                        Skema: {selectedData?.Kd_skema.Nm_skema}
                      </p>
                      <p className="">
                        Jenis: {selectedData?.Kd_skema.Jenis}
                      </p>
                      <p className="">
                        Unit: {selectedData?.Kd_skema.Jml_unit}
                      </p>
                    </div>
                  </div>
                )
              }
              <div className="flex justify-end gap-2">
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
  );
}
