import SkeletonElement from "./skeletonElement"

const SkeletonArticles = ({theme}) => {
    return(

        <div className={`skeleton-wrapper ${theme ? theme : 'light'}`}>
            <div className="skeleton-articles">
                <SkeletonElement type="text"/>
                <SkeletonElement type="title"/>
                <SkeletonElement type="text"/>
                <SkeletonElement type="text"/>
                <SkeletonElement type="text"/>
            </div>
        </div>
    )
}


export default SkeletonArticles