function Post({ post }) {
    return (
        <>
            <h2>
                {post.id} {post.title}
            </h2>
            <p>{post.body}</p>
        </>
    )
}

export default Post

// For routes with dynamic path parameter which we want to statically generate at build time, we must define also the getstaticpaths function which tells next which dynamic paths to statically generate at build time. This is because, without telling it, next will have alot of paths depending on the number of possible parameters (e.g in the case of 1ooposts, that is 100 possible routes with same html structure but different data due to different route parameters) and this leaves it confused as to what amount of work needs to be done at build time.
// Like the getstaticprops, this function also returns an object which contains a 'paths' key which will be an array of objects containing 'params' which is also an object containing each path parameter, in our case here - postId with a string value.. 
// It must also contain a second key called 'fallback' with possible values of false, true or blocking.
export async function getStaticPaths() { 
    
    // make the API call
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // convert the response to json
    const data = await response.json()
    // Map through the data to set the id of the posts for dynamic paths
    const paths = data.map(post => {
        return {
            params: {
                // The `` is to stringify the returned id from the api since it is numeric and we need it as a string
                postId: `${post.id}`
            }
        }
    })
    return {
        // paths:[
            // {
            //     params:{ postId:'1'}
            // },
            // {
            //     params:{ postId:'2'}
            // },
            // {
            //     params:{ postId:'3'}
            // }
        // ],
        paths,
        fallback: false
    }
}


// The getstaticprops function accepts a parameter which by convention is called 'context'. This parameter is an object which we will destructure into params from which in our case we will get the post id we need to fetch.
export async function getStaticProps(context) {
    // Destructure parameter
    const { params } = context
    // make the API call
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    // convert the response to json
    const data = await response.json()
    console.log(data)
    // return an object of object holding the fetched data in a props object.
    return {
        props:{
            post: data,
        },
    }
}