import SkeletonElement from "./skeletonElement"

const SkeletonUser = ({theme}) => {
    return(

        <div className={`skeleton-wrapper ${theme ? theme : 'light'}`}>
            <div className="skeleton-user">
                <SkeletonElement type="avatar"/>
                <div className='wrapper'>
                    <SkeletonElement type="text"/>
                    <SkeletonElement type="text"/>
                    <SkeletonElement type="title"/>
                </div>
            </div>
        </div>
    )
}


export default SkeletonUser