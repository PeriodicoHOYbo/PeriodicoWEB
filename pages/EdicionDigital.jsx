import { writeUserData, getData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from '../components/Button'
import Error from '../components/Error'
import style from '../styles/Form.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
import Tag from '../components/Tag'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import NavbarBack from '../components/NavbarBack';

function Form({ topic, value, color }) {
    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()
    const router = useRouter()

    const [data, setData] = useState({})
    const [isChecked, setIsChecked] = useState(true)
    const [isCheckedComp, setIsCheckedComp] = useState(true)
    const [isCheckedLength, setIsCheckedLength] = useState(true)

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)
    const [fileList, setFileList] = useState([])

    function manageInputIMG(e) {
        e.preventDefault()
        const fileName = `${e.target.name}`
        const file = e.target.files[0]
        setFileList([...e.target.files])
        if (fileName === 'PostImage') {
            setPostImage(file)
            setUrlPostImage(URL.createObjectURL(file))
        }
    }


    console.log(userDB)

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }


    const handlerItem = (index) => {
        const arr = [...fileList]
        arr.splice(index, 1)
        setFileList(arr)
    }


    const bytesToMegaBytes = bytes => bytes / (1024 * 1024)
    function save(e) {
        e.preventDefault()
        const newDate = new Date()

        const ruteDB = `EdicionDigital/${data.titular !== undefined && data.titular}`
        const ruteSTG = `EdicionDigital/${data.titular !== undefined && data.titular}`

        uploadIMG(ruteDB, ruteSTG, '', fileList, setUserSuccess, null, false, true)


        // if (postImage) {
        //     const ruteDB = `/${topic}/Posts` // Nov-2022/Inicio
        //     const ruteSTG = `${topic}` // Nov-2022/
        //     const fileName = `PostImage_${newDate.getTime()}` // PostImage_Tue Nov 15 2022 
        //     const object = { [fileName]: { fecha: newDate.getTime(), description: data.descriptionPost ? data.descriptionPost : '', enlace: data.enlacePost ? data.enlacePost : `${num}${newDate.getTime()}`, objectFit: data.objectPositionPost ? data.objectPositionPost : 'center', nota: '' } }
        //     setUserSuccess('Cargando')
        //     writeUserData(ruteDB, object, setUserSuccess, setUserData)
        //     uploadIMG(ruteDB, ruteSTG, fileName, postImage, setUserSuccess, monthYear, isCheckedComp)


        //     isChecked && writeUserData(`/Inicio/Posts`, object, setUserSuccess, setUserData)
        //     isChecked && uploadIMG(`/Inicio/Posts`, 'Inicio', fileName, postImage, setUserSuccess, monthYear, isCheckedComp)

        // } else {
        //     setUserSuccess("CompleteIMG")
        // }
    }

    console.log(data)
    return (
        <div className='bg-white h-full md:grid md:grid-cols-2'>
            <NavbarBack></NavbarBack>

            {/* <select className={style.select}  name={`${topic}-Template-${dayMonthYear}`} onChange={manageTemplate} style={{ backgroundColor: color, fontWeight: 'bold', border: '2px solid brown' }}> */}
            <div className={`min-h-[500px] bg-blue-500 relative flex flex-col justify-center items-center bg-[#00404a]`}>
                <h3 className='text-white pb-[20px]'> Edición Dígital</h3>
                <form className={`${style.formSelectPost} w-full bg-white p-10 max-w-[350px] space-y-5 rounded-[20px]`} onSubmit={save}>
                    <label htmlFor={`${topic}-Post`} className={`block relative cursor-pointer min-w-[140px] rounded-[20px] transition-all w-full p-[2px] text-[white] text-[12px] bg-[brown] border-[2px] border-[brown]`} >Cargar Imagenes </label>
                    <input type="file" id={`${topic}-Post`} className={style.inputFile} name={`PostImage`} onChange={manageInputIMG} accept=".jpg, .jpeg, .png, .mp4, webm" multiple />
                    <input type="text" className='w-full border-b-[1px] border-gray-500' placeholder='Titular' name="titular" onChange={handlerEventChange} maxLength={isCheckedLength ? 65 : ''} />
                    <input type="text" className='w-full border-b-[1px] border-gray-500' placeholder='Enlace PDF' name="EnlacePDF" onChange={handlerEventChange} />
                    <Button theme="buttonMiniSecondary" type='button'>Guardar</Button>
                </form>
            </div>
            <div className="divide-y divide-gray-200  p-10 h-screen overflow-y-scroll w-full ">
                <h3 className='text-center'>Imagenes Seleccionadas</h3>
                <br />
                <ul className="divide-y divide-gray-200 ">
                    {fileList.length > 0 && fileList.map((i, index) => {


                        return <li className="pb-3 sm:pb-4 w-full" key={index}>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">

                                    <img className="w-8 h-8 rounded-[5px]" src={URL.createObjectURL(i)} alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {i.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {bytesToMegaBytes(i.size).toFixed(2)} MB
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" onClick={() => handlerItem(index)}>
                                        <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line>
                                    </svg>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>

            <div className="divide-y divide-gray-200  p-10 h-screen overflow-y-scroll w-full ">
                <h3 className='text-center'>Edición digital</h3>
                <br />
                <ul className="divide-y divide-gray-200 ">
                    {userDB.EdicionDigital !== undefined  && Object.entries(userDB.EdicionDigital).map((i, index) => {


                        return <li className="flex flex-col pb-3 sm:pb-4 w-full" key={index}>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <img className="w-[50px] h-[80px] rounded-[5px]" src={URL.createObjectURL(i[1][0].url)} alt="Neil image" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {i[0]}
                                    </p>
                                    {/* <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {bytesToMegaBytes(i.size).toFixed(2)} MB
                                    </p> */}
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" onClick={() => handlerItem(index)}>
                                        <path fill="#f44336" d="M44,24c0,11-9,20-20,20S4,35,4,24S13,4,24,4S44,13,44,24z"></path><line x1="16.9" x2="31.1" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line><line x1="31.1" x2="16.9" y1="16.9" y2="31.1" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4"></line>
                                    </svg>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>


        </div>
    )
}


export default WithoutAuth(Form)