import Link from "next/link"

function PostList({posts}) {
    return <>
        <h1>List of Posts</h1>
        {
            posts.map(post => {
                return (
                    <div key={post.id}>
                        {/* <Post post={post} /> */}
                        <Link href={`posts/${post.id}`}>
                            <h2>
                                {post.id} {post.title}
                            </h2>
                        </Link>
                        <hr />
                    </div>
                )
            })
        }
    </>
}

export default PostList

export async function getStaticProps() {
    // make the API call
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // convert the response to json
    const data = await response.json()
    console.log(data)
    // return an object of object holding the fetched data in a props object.
    return {
        props:{
            // Grab only the first 3
            // posts: data.slice(0,3),
            // return all
            posts: data
        },
    }
}
