function Profile(props){
    return(

        <div>
            <h2>Full name: {props.fullname}</h2>
            <p>username: {props.username}</p>
        </div>
    )
}
export default Profile;