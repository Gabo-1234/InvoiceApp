export const ToggleDark = () => {
    const root = document.getElementById("root");
    if (root.classList.contains("Light-Bg")) {
        root.classList.remove("Light-Bg");
        root.classList.add("Dark-Bg");
    } else {
        root.classList.remove("Dark-Bg");
        root.classList.add("Light-Bg");
    }
}