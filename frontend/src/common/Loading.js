import { ThreeDots } from "react-loader-spinner"

const Loading = () => {
    return (
        <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="cyan"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ display: 'block' }}
            wrapperClassName=""
            visible={true}
        />
    )
}

export default Loading