import useMediaQuery from "./hooks/useMediaQuery"

export const Affectiva = () => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    const affectivaHTML = isDesktop ? `
    <button class="start" id="start" onclick="onStart()">Read emotion using camera</button>` : `
    <button class="start-mobile" id="start" onclick="onStart()">Read emotion using camera</button>`

    return (
        <>
            <h1 className={isDesktop ? "wrapper-header" : "wrapper-header-mobile"}>EMOTION JOURNAL</h1>
            <div className={isDesktop ? "face-detection" : "face-detection-mobile"} id="face-detection">
                :)
            </div>
            <div id="affdex_elements"></div>
            <div dangerouslySetInnerHTML={{ __html: affectivaHTML }}></div>
            <h2 className={isDesktop ? "advice" : "advice-mobile"} id="advice">★ For the best results, make sure your environment is well-lit, and that you are 5-7 inches away from the camera.</h2>
            <div className={isDesktop ? "results" : "results-mobile"} id="results"></div>
        </>
    )
}