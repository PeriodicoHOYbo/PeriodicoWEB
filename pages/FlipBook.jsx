import HTMLFlipBook from 'react-pageflip';
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import NavbarBack from '../components/NavbarBack';
import { useRouter } from 'next/router'

function MyBook(props) {
    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()
    const router = useRouter()

    console.log(router.query.edicion)

    return (
        userDB && userDB !== undefined && userDB.EdicionDigital && userDB.EdicionDigital[ router.query.edicion] && userDB.EdicionDigital[ router.query.edicion] !== undefined && <div className='relative top-[-200px] bg-[#00404a] h-screen w-full flex items-center overflow-hidden sm:h-auto sm:min-h-screen'>
            <NavbarBack></NavbarBack>

            <button className='fixed text-[20px] text-gray-500 h-[40px] w-[100px] text-white rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:left-[20px] pointer-events-none' >Anterior</button>
            <button className='fixed text-[20px] text-gray-500 h-[40px] w-[100px] text-white rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:right-[20px] pointer-events-none' >Siguiente</button>

            <HTMLFlipBook width={window.screen.width - 300} height={window.screen.width * 1.3}

                maxShadowOpacity={0.5}
                showCover={false}
                swipeDistance={100}
                flippingTime={500}
                mobileScrollSupport={true}
            >
                {/* {Object.values(userDB.EdicionDigital[ router.query.edicion]).map((i, index) => <img src={`${i.url}`} key={index} />)} */}
                {Object.values(userDB.EdicionDigital[ router.query.edicion]).map((i, index) => <img src={`${i.url}`} key={index} />)}
            </HTMLFlipBook>
        </div>
    )
}


export default WithoutAuth(MyBook)