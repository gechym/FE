import { useEffect, useState } from "react"
import SkeletonArticles from '../components/skeleton/skeletonArticles'

const Articles = () => {
    
    const [articles, setArticles] = useState(null)

    useEffect(  () => {
        setTimeout(async() => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts")
            const data = await res.json()
            setArticles(data)
        },5000)
    })

    return (
        <>
            <h2>Articles</h2>
            <SkeletonArticles theme="dark"/>
            <SkeletonArticles />
            {
                articles ? articles.map(post => {
                    return(
                        <div key={post.id} className="articles">
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    )
                }) : [1,2,3,4,5].map(() => <SkeletonArticles theme="dark"/>)
            }
            
        </>
    )
}


export default Articles