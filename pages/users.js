import User from "@/components/user"

// our component here accepts props, in this case the users props from out async function below
function UserList({ users }) {
    return <>
                <h1>List of users</h1>
                {
                    users.map(user => {
                        return (
                            <div key={user.id}>
                                <User user={user} />
                            </div>
                        )
                    })
                }
            </>
}

export default UserList

// In next, we can export an async function with our component which runs at buil time and is then passed to it as a prop.
// We can make API calls or requests to our backend client to get data needed for the page therefore, makes static prerendering with data possible.
export async function getStaticProps() {
    // make the API call
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    // convert the response to json
    const data = await response.json()
    console.log(data)
    // return an object of object holding the fetched data in a props object.
    return {
        props:{
            users: data,
        },
    }
}

