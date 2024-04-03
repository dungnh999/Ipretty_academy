import useRouter from "use-react-router";

function useNavigator() {
    const { location: { search }, history} = useRouter();

    return (url, replace = false, preserveQs = false, isScroll = true) => {
        const targetUrl = preserveQs ? url + search : url;
        if (replace) {
            history.replace(targetUrl);
        } else {
            history.push(targetUrl);
        }
        if (isScroll) {
            window.scrollTo({ behavior: "smooth", top: 0 });
        }

    };
}

export default useNavigator;
