const video = () => {
    const videos = document.querySelectorAll(".about-us__video");
    videos.forEach(video => {
        video.addEventListener("click", (e) => {
            video.setAttribute("controls", true);
        })
    })
}

export default video;