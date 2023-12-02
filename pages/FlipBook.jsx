import HTMLFlipBook from 'react-pageflip';
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import NavbarBack from '../components/NavbarBack';

function MyBook(props) {
    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear, viewPeriodista } = useUser()

    console.log(window.screen.width)

    return (
        userDB && userDB !== undefined && userDB.EdicionDigital && userDB.EdicionDigital['Edicion 11_2023'] && userDB.EdicionDigital['Edicion 11_2023'] !== undefined && <div className=' bg-[#00404a] h-screen w-full flex items-center overflow-hidden sm:h-auto sm:min-h-screen sm:pt-[75px]'>
            <NavbarBack></NavbarBack>

            <button className='fixed text-[20px] text-gray-500 h-[40px] w-[100px] text-white rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:left-[20px] pointer-events-none' >Anterior</button>
            <button className='fixed text-[20px] text-gray-500 h-[40px] w-[100px] text-white rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000080] z-20 lg:right-[20px] pointer-events-none' >Siguiente</button>

            <HTMLFlipBook width={window.screen.width - 30} height={window.screen.width * 1.3}

                maxShadowOpacity={0.5}
                showCover={false}
                swipeDistance={300}
                flippingTime={500}
                mobileScrollSupport={true}
            >
                {/* {Object.values(userDB.EdicionDigital['Edicion 11_2023']).map((i, index) => <img src={`${i.url}`} key={index} />)} */}
                {Object.values(userDB.EdicionDigital['Edicion 11_2023']).map((i, index) => <img src={`${i.url}`} key={index} />)}
            </HTMLFlipBook>
        </div>
    )
}


export default WithoutAuth(MyBook)