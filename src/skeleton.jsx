import User from './components/user'
import Articles from './components/articles'
import './skeleton.scss'


const Skeleton = () => {
    return(
        <>
            <header>
                <h1>Test Skeleton</h1>
            </header>
            <div className="container-skeleton">
                <div className="left">
                    <Articles/>
                </div>
                <div className="right">
                    <User/>
                </div>
            </div>
        </>
    )
}

export default Skeleton