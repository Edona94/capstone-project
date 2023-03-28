import '../styling/Header.css'

export default function Footer(){
    const today = new Date()
    return(
        <footer className={"footer"}>
             &copy;{today.getFullYear()}
        </footer>
    )
}