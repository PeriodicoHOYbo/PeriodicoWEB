import HTMLFlipBook from 'react-pageflip';
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import NavbarBack from '../components/NavbarBack';
import { useRouter } from 'next/router'
import { useState } from 'react';

function MyBook(props) {
    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()
    const router = useRouter()
    let navegador = navigator.userAgent;
    const [zoom, setZoom] = useState(false)

    return (
        userDB && userDB !== undefined && userDB.EdicionDigital && userDB.EdicionDigital[router.query.edicion] && userDB.EdicionDigital[router.query.edicion] !== undefined && <div className='absolute flex justify-center items-center bg-gray-800 min-h-screen w-full overflow-hidden '>
            <NavbarBack></NavbarBack>
            <div className={`${zoom && 'pointer-events-none'}`} onClick={(e) => e.preventDefault()}>
                <HTMLFlipBook
                    width={screen.width * 1.5}
                    height={screen.height * 0.83}
                    maxShadowOpacity={0.5}
                    showCover={false}
                    swipeDistance={10}
                    flippingTime={500}
                    mobileScrollSupport={true}
                >
                    {Object.values(userDB.EdicionDigital[router.query.edicion]).map((i, index) => {
                        const isOdd = (index + 1) % 2 !== 0;
                        const leftOrRight = isOdd ? 'right' : 'left';
                        return (
                            <div className={`relative w-full h-full sm:w-1/2 sm:h-full flex justify-center sm:justify-${leftOrRight} p-1`} key={index}>
                                <div className={`relative w-full h-full`}>
                                    <img className='object-contain object-center' src={`${i.url}`} />
                                </div>
                            </div>
                        )
                    })}
                </HTMLFlipBook>
            </div>
            <button className='fixed text-[20px]  h-[40px] w-[200px] text-white rounded-full inline-block right-[0px] left-0 bottom-[50px] mx-auto bg-[#00000080] z-20 lg:bottom-[20px]' onClick={() => setZoom(!zoom)}>{zoom ? 'desabilitar zoom +' : 'habilitar zoom +'}</button>
            {zoom === false && <button className='fixed text-[20px]  h-[40px] w-[100px] text-white rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:left-[20px] pointer-events-none' >Anterior</button>}
            {zoom === false && <button className='fixed text-[20px]  h-[40px] w-[100px] text-white rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:right-[20px] pointer-events-none' >Siguiente</button>}

        </div>
    )
}


export default WithoutAuth(MyBook)



















































// import HTMLFlipBook from 'react-pageflip';
// import { useUser } from '../context/Context.js'
// import { WithoutAuth } from '../HOCs/WithoutAuth'
// import NavbarBack from '../components/NavbarBack';
// import { useRouter } from 'next/router'
// import { useState } from 'react';

// function MyBook(props) {
//     const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()
//     const router = useRouter()
//     let navegador = navigator.userAgent;
//     const [zoom, setZoom] = useState(false)
//     console.log(window.screen.width)

//     return (
//         // userDB && userDB !== undefined && userDB.EdicionDigital && userDB.EdicionDigital[router.query.edicion] && userDB.EdicionDigital[router.query.edicion] !== undefined && <div className={`absolute  flex justify-center items-center bg-[#00404a] min-h-screen min-w-full ${zoom === false && 'overflow-hidden'} `}>
//         userDB && userDB !== undefined && userDB.EdicionDigital && userDB.EdicionDigital[router.query.edicion] && userDB.EdicionDigital[router.query.edicion] !== undefined && <div className={`absolute   bg-[#313333] h-screen w-full ${zoom === false && 'overflow-hidden'} `}>

//             <NavbarBack></NavbarBack>
//             <button className='fixed text-[20px]  h-[40px] w-[200px] text-white rounded-full inline-block right-[0px] left-0 bottom-[50px] mx-auto bg-[#00000080] z-20 lg:bottom-[20px]' onClick={() => setZoom(!zoom)}>{zoom ? 'desabilitar zoom +' : 'habilitar zoom +'}</button>
//             {zoom === false && <button className='fixed text-[20px]  h-[40px] w-[100px] text-white rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:left-[20px] pointer-events-none' >Anterior</button>}
//             {zoom === false && <button className='fixed text-[20px]  h-[40px] w-[100px] text-white rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:right-[20px] pointer-events-none' >Siguiente</button>}

//             <div className={`${zoom && 'pointer-events-none'} min-h-screen flex items-center`} onClick={(e) => e.preventDefault()}>


//                 <HTMLFlipBook
//                     // width={navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || window.innerWidth <= 780 ? window.screen.width - 50 : window.screen.width - 300}
//                     width={screen.width}
//                     height={screen.height * .8}
//                     // size={'stretch'}
//                     maxShadowOpacity={0.5}
//                     showCover={false}
//                     swipeDistance={100}
//                     flippingTime={500}
//                     mobileScrollSupport={true}
//                 >
//                     {/* {Object.values(userDB.EdicionDigital[ router.query.edicion]).map((i, index) => <img src={`${i.url}`} key={index} />)} */}
//                     {Object.values(userDB.EdicionDigital[router.query.edicion]).map((i, index) => {
//                         return <img className='   h-screen object-contain' src={`${i.url}`} />


//                         {/* // return <div className='relative flex justify-center items-center sm:min-h-screen' key={index}> */ }
//                         {/* <img className='absolute bottom-0 top-0 my-auto inline-block  px-[10px] w-full sm:h-full object-contain object-center' src={`${i.url}`} /> */ }


//                     })}
//                 </HTMLFlipBook>
//             </div>


//         </div>
//     )
// }


// export default WithoutAuth(MyBook)
