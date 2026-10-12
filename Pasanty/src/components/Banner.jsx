
const Banner = ({url}) => {

    if (!url) {
        return (
            <div className="w-full h-40 bg-gray-300 rounded-b-lg" />
        )
    }

    return (
        <img src={url}
            alt="banner de empresa"
            className="w-full h-40 rounded-b-lg"
        />
    )
}

export default Banner